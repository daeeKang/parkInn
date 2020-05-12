import React from "react";
import Konva from "konva";
import Modal from "react-modal";
import api from "../../utils/api";
import "./Renderer.css";
import Header from '../Header/Header';
import { Stage, Layer, Star, Text, Line, Rect } from "react-konva";
import GetLot from "./GetLot";
import Profile from "../Profile";
import config from '../../auth_config.json';

import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { NavLink } from 'react-router-dom';
import HomeDialog from './HomeDialog';
import Home from './home.svg';


export default class Renderer extends React.Component {
    state = {
        lotid: null,

        //state
        drawingState: "pan",

        //stage
        scale: 1,
        snappingRatio: 10,
        stage: {
            x: 0,
            y: 0,
        },
        walls: [],
        parkingLines: [],
        parkingLabel: [],
        lotRect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            visible: false,
        },
        stagingParkingLines: [],
        stagingParkingLabel: [],

        //UI
        showParkingLotForm: false,
        numOfSpaces: 0,
        orient: "down",
        labelSize: 50,

        //dev
        cursorLocation: {
            x: 0,
            y: 0,
        },
        parkingCount: 100,
        name: ""
    };

    componentDidMount() {
        if(this.props.user != undefined)
            this.loadData(this.props.user)
    }

    updateName = (val) => {
        this.setState({
            name: val
        })
        console.log(val);
    }

    //H3LP3R FUNCT1ONSS ----------------------------------------------------------------------------------------------------------------------------
    snapGrid(roundTo, num) {
        let rem = num % roundTo;
        if (rem < roundTo / 2) {
            return num - rem;
        } else {
            return num + (roundTo - rem);
        }
    }

    getRelativePointerPosition = (s) => {
        let pos = s.getPointerPosition();
        return {
            x: pos.x / this.state.scale - this.state.stage.x / this.state.scale,
            y: pos.y / this.state.scale - this.state.stage.y / this.state.scale,
        };
    };

    serializeData = () => {
        let out = {
            walls: this.state.walls,
            parkingLines: this.state.parkingLines,
            parkingLabel: this.state.parkingLabel,
        };

        out = JSON.stringify(out);
        api
            .post("http://localhost:8000/Lot/UpdateLotDesign", {
                companyid: this.props.user.companyid,
                lotid: this.state.lotid,
                design: out,
                parkingLabel: this.state.parkingLabel
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    loadData = async(a) => {
        if(a.companyid == undefined) {
            console.log("no companyid");
            return;
        }
        let lotid;

        await api
            .get(`http://localhost:8000/Lot/GetLots/` + a.companyid, {
                client_id: config.clientId,
                email: a.username,
                connection: config.connection,
            })
            .then((res) => {
                lotid = res.data[0].lotid
                this.setState({
                    lotid: lotid
                })

                api
                .get("http://localhost:8000/Lot/GetLotDesign/"+a.companyid+"/"+lotid, {
                    client_id: config.clientId,
                    email: a.username,
                    connection: config.connection,
                })
                .then((res) => {
                    let parsed = res.data;
                    console.log(parsed);
                    if(parsed.parkingLines == undefined) return;
                    this.setState({
                        walls: parsed.walls,
                        parkingLines: parsed.parkingLines,
                        parkingLabel: parsed.parkingLabel,
                    });

                    if(this.state.parkingLabel.length != 0){
                        if(!isNaN(parseInt(this.state.parkingLabel[this.state.parkingLabel.length - 1].text))){
                            this.setState({
                                parkingCount: 100
                            })
                        } else 
                        this.setState({
                            parkingCount: parseInt(this.state.parkingLabel[this.state.parkingLabel.length - 1].text)
                        })
                    } else {
                        this.setState({
                            parkingCount: 100
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err)
            })

        

    };

    //EVENT HANDLERS DOWN BELOOOOWW-----------------------------------------------------------------------------------------------------------------
    //stage handeling
    handleStageDrag = (e) => {
        if (this.state.drawingState === "pan") {
            this.setState({
                stage: {
                    x: e.target.attrs.x,
                    y: e.target.attrs.y,
                },
            });
        }
    };

    //disable this for now sh1t is w0nky

    //used for zooming in and out of the map duh lmfao xd
    stageZoom = (e) => {
        //this is code copied from stack overflow dont ask me how it works lol
        e.evt.preventDefault();

        const scaleBy = 1.08;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale =
            e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        this.setState({
            scale: newScale,
            stage: {
                draggable: this.state.stage.draggable,
                x:
                    -(
                        mousePointTo.x -
                        stage.getPointerPosition().x / newScale
                    ) * newScale,
                y:
                    -(
                        mousePointTo.y -
                        stage.getPointerPosition().y / newScale
                    ) * newScale,
            },
        });
    };

    //variables used for drawing
    isPaint = false;
    selectionBox = null;

    //this function is used for drawing rectangles, whatever we need
    startDrawing = (e) => {
        //create rectangle
        switch (this.state.drawingState) {
            case "drawWall": {
                //note we need these brackets here to create scope otherwise same scope for entire switch
                //enter here if we are finished painting object
                if (this.isPaint) {
                    this.isPaint = false;
                    let walls = this.state.walls;
                    let wall = walls[walls.length - 1];
                    if (wall.width === 0 || wall.height === 0) {
                        walls.pop();
                    }
                    this.setState({
                        walls: walls,
                    });
                    return;
                }
                //else enter here to start drawing rectangle
                let stage = e.target.getStage();
                let walls = this.state.walls;
                let pos = this.getRelativePointerPosition(stage);
                this.setState({
                    cursorLocation: {
                        x: pos.x,
                        y: pos.y,
                    },
                });
                walls.push({
                    x: this.snapGrid(this.state.snappingRatio, pos.x),
                    y: this.snapGrid(this.state.snappingRatio, pos.y),
                    width: 0,
                    height: 0,
                });
                this.setState({
                    walls: walls,
                });
                console.log(walls);
                this.isPaint = true;
                break;
            }
            case "drawParkingSpots": {
                if (this.isPaint) {
                    //set parking lot shit here
                    this.isPaint = false;
                    console.log(this.state.lotRect);
                    //TODO get this working
                    // this.frameObjectOnStage(
                    //     this.state.lotRect.x,
                    //     this.state.lotRect.y,
                    //     this.state.lotRect.width,
                    //     this.state.lotRect.height
                    // );
                    this.openParkingLotForm();
                    return;
                }
                let stage = e.target.getStage();
                let pos = this.getRelativePointerPosition(stage);

                this.setState({
                    lotRect: {
                        x: this.snapGrid(this.state.snappingRatio, pos.x),
                        y: this.snapGrid(this.state.snappingRatio, pos.y),
                        width: 0,
                        height: 0,
                        visible: true,
                    },
                });

                this.setState({
                    cursorLocation: {
                        x: pos.x,
                        y: pos.y,
                    },
                });
                this.isPaint = true;
                break;
            }
            default: {
                break;
            }
        }
    };
    //this function checks if we are currently drawing. if we are, then get out cursor position and use that to redefine the width of the box we are drawing
    sizeDrawing = (e) => {
        if (!this.isPaint) return;

        switch (this.state.drawingState) {
            case "drawWall": {
                let walls = this.state.walls;
                let wall = walls[walls.length - 1];
                let stage = e.target.getStage();

                let pos = this.getRelativePointerPosition(stage);

                wall.width = this.snapGrid(
                    this.state.snappingRatio,
                    pos.x - wall.x
                );
                wall.height = this.snapGrid(
                    this.state.snappingRatio,
                    pos.y - wall.y
                );

                this.setState({
                    walls: walls,
                });
                break;
            }
            case "drawParkingSpots": {
                let stage = e.target.getStage();
                let pos = this.getRelativePointerPosition(stage);

                this.setState({
                    lotRect: {
                        x: this.state.lotRect.x,
                        y: this.state.lotRect.y,
                        width: this.snapGrid(
                            this.state.snappingRatio,
                            pos.x - this.state.lotRect.x
                        ),
                        height: this.snapGrid(
                            this.state.snappingRatio,
                            pos.y - this.state.lotRect.y
                        ),
                        visible: true,
                    },
                });
                break;
            }
            default: {
                break;
            }
        }
    };

    objectClick = (e) => {
        switch (this.state.drawingState) {
            case "erase":
                console.log(e);
                break;
            default: {
                break;
            }
        }
    };

    openParkingLotForm = async (coords) => {
        //check to see which orient it should default to
        if(Math.abs(this.state.lotRect.width) < Math.abs(this.state.lotRect.height)){
            await this.setState({
                orient: "right"
            });
        }
        
        this.setState({
            showParkingLotForm: true,
        });
    };

    // frameObjectOnStage = (x, y, width, height) => {
    //     const stage =

    //     this.setState({
    //         stage: {
    //             x: pos.x,
    //             y: pos.y
    //         }
    //     });
    // };

    parkingFormChange = (e) => {
        switch (e.target.id) {
            case "numOfSpaces": {
                this.setState({
                    numOfSpaces: e.target.value,
                });
                this.drawParkingSpots(e.target.value);
                break;
            }
            case "accept": {
                this.setState({
                    parkingLines: this.state.parkingLines.concat(
                        this.state.stagingParkingLines
                    ),
                    parkingLabel: this.state.parkingLabel.concat(
                        this.state.stagingParkingLabel
                    )
                });
                this.exitParkingForm();

                break;
            }
            case "cancel": {
                break;
            }
            default:
                return;
        }
    };

    drawParkingSpots = (num) => {
        if (num > 100) {
            this.setState({
                numOfSpaces: 100,
            });
            num = 100;
        }

        let dimensions = {
            width: this.state.lotRect.width,
            height: this.state.lotRect.height,
        };

        //TO-DO: boundary check or somethin lol
        let origx = this.state.lotRect.x;
        let origy = this.state.lotRect.y;

        //check to see if they made rectangle bottom up, if so , switch origin
        if(dimensions.height < 0){
            origy = origy + dimensions.height;
            dimensions.height = -dimensions.height;
        }
        if(dimensions.width < 0){
            origx = origx + dimensions.width;
            dimensions.width = -dimensions.width;
        }
        
        let parkingLines = [];
        //draw parking lines
        switch(this.state.orient){
            default:
            case "up":
            case "down": {
                for (let i = 0; i < num; i++) {
                    parkingLines.push({
                        x1: origx + (dimensions.width / num) * i,
                        y1: origy,
                        x2: origx + (dimensions.width / num) * i,
                        y2: origy + dimensions.height,
                    });
                }
                //for end line
                parkingLines.push({
                    x1: origx + dimensions.width,
                    y1: origy,
                    x2: origx + dimensions.width,
                    y2: origy + dimensions.height,
                });
                break;
            }
            case "right":
            case "left": {
                for (let i = 0; i < num; i++) {
                    parkingLines.push({
                        y1: origy + (dimensions.height / num) * i,
                        x1: origx,
                        y2: origy + (dimensions.height / num) * i,
                        x2: origx + dimensions.width,
                    });
                }
                //for end line
                parkingLines.push({
                    y1: origy + dimensions.height,
                    x1: origx,
                    y2: origy + dimensions.height,
                    x2: origx + dimensions.width,
                });
                break;
            }
        }

        this.setState({
            stagingParkingLines: parkingLines,
        });

        //draw labels
        let labels = [];
        let inText = this.state.parkingCount; //change this
        switch(this.state.orient){
            default:
            case "up":
            case "down": {
                for (let i = 0; i < num; i++) {
                    labels.push({
                        x: origx + (dimensions.width / num) * (i + 1),
                        y: origy,
                        height: dimensions.width / num,
                        width: dimensions.height,
                        size: this.state.labelSize,
                        fill: "#81C784",
                        text: ++inText,
                        rotation: 90
                    });
                }
                break;
            }
            case "left":
            case "right": {
                for (let i = 0; i < num; i++) {
                    labels.push({
                        y: origy + (dimensions.height / num) * i,
                        x: origx,
                        width: dimensions.width,
                        height: dimensions.height / num,
                        size: this.state.labelSize,
                        fill: "#81C784",
                        text: ++inText,
                        rotation: 0
                    });
                }  
                break;
            }

        }

        this.setState({
            stagingParkingLabel: labels,
            parkingCount: inText,
        });
    };

    //---------------------------BUTTON TYPA TINGZ--------------------------------//
    resetOrigin = (e) => {
        this.setState({
            stage: {
                draggable: true,
                x: 0,
                y: 0,
            },
            scale: 1,
        });
    };
    toggleMoveStage = (e) => {
        this.changeDrawingState("pan");
    };
    toggleDrawingMode = (e) => {
        this.changeDrawingState("drawWall");
        this.exitParkingForm();
    };
    toggleDrawParkingSpots = (e) => {
        this.changeDrawingState("drawParkingSpots");
    };
    toggleErase = (e) => {
        this.changeDrawingState("erase");
        this.exitParkingForm();
    };
    changeOrient = async (orient) => {
        console.log(orient);
        await this.setState({
            orient: orient
        });
        this.drawParkingSpots(this.state.numOfSpaces);
    }
    changeLabelSize = async (e) => {
        await this.setState({
            labelSize: e.target.value
        })
        this.drawParkingSpots(this.state.numOfSpaces);
    }
    exitParkingForm = () => {
        this.setState({
            stagingParkingLines: [],
            stagingParkingLabel: [],
            numOfSpaces: 0,
            orient: "down",
            showParkingLotForm: false,
            lotRect: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                visible: false,
            }
        })
    }

    //-----------------------------STATE CHANGE HANDLING----------------------------------------------//

    changeDrawingState = (inState) => {
        switch (inState) {
            case "pan":
                this.setState({
                    drawingState: inState,
                });
                break;
            case "erase":
            case "drawParkingSpots":
            case "drawWall":
                this.isPaint = false;
                this.setState({
                    drawingState: inState,
                });
                break;
            default:
                console.log(
                    "shit boi u not supposed to be in here lmfao didn't write state or something fucked up"
                );
                break;
        }
    };

    //-----------------------------REACT TYPE STYLING------------------------------------------------//
    buttonSelected = {
        color: "#fff",
        backgroundColor: "#294b66",
        opacity: "0.9",
    };

    modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    parkingLotFormOpen = {
        right: "0vw",
    };

    //-----------------------------RENDER---:-)-------------------------kill me-----------------------//
    render() {
        return (
            <div>
                {/* <Header /> */}
                <div
                    className="parkingLotForm"
                    style={
                        this.state.showParkingLotForm
                            ? this.parkingLotFormOpen
                            : null
                    }
                >
                    <div className="formContainer">
                        <p id="pls">Select an Orientation:</p>
                        <div>
                            <div>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("down")}
                                    style={this.state.orient === "down"? this.buttonSelected : null}
                                >
                                Left to Right
                                </button>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("up")}
                                    style={this.state.orient === "up"? this.buttonSelected : null}
                                >
                                Right to Left
                                </button>
                            </div>
                            <div>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("right")}
                                    style={this.state.orient === "right"? this.buttonSelected : null}
                                >
                                Up to Down
                                </button>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("left")}
                                    style={this.state.orient === "left"? this.buttonSelected : null}
                                >
                                Down to Up
                                </button>
                            </div>
                        </div>
                        <div>
                            <br/><br/>
                            <p id="pls">Number of Spaces:</p>
                            <input
                                type="text"
                                id="numOfSpaces"
                                className="formInput"
                                value={this.state.numOfSpaces}
                                onChange={this.parkingFormChange}
                            />
                            <br/><br/>
                            <p id="pls">Select Size:</p>
                            {/* HELP WTF */}
                            <input onChange={this.changeLabelSize} type="range" min="20" max="80" value={this.state.labelSize} class="slider" />
                            <br/><br/>
                        </div>
                        
                        {/* <div className="bottom"> */}
                            {/* <center> */}
                                <button
                                className="formButtons greenButton"
                                id="accept"
                                onClick={this.parkingFormChange}
                                >
                                    Okay
                                </button>
                                <button
                                    className="formButtons redButton"
                                    id="cancel"
                                    onClick={this.exitParkingForm}
                                >
                                    Discard
                                </button>
                            {/* </center> */}
                        {/* </div> */}
                    </div>
                </div>

                {/*
    <div className="devBox">
                    <p>dev console</p>
                    <p>
                        stage pos:
                        {this.state.stage.x}, {this.state.stage.y}
                    </p>
                    <p>
                        cursor pos:
                        {this.state.cursorLocation.x},
                        {this.state.cursorLocation.y}
                    </p>
                </div>
    */}

                <div className="controls">
                    <HomeDialog />
                    <button onClick={this.resetOrigin}>reset</button>
                    <button
                        onClick={this.toggleMoveStage}
                        style={
                            this.state.drawingState === "pan"
                                ? this.buttonSelected
                                : null
                        }
                    >
                        move
                    </button>
                    <button
                        onClick={this.toggleDrawingMode}
                        style={
                            this.state.drawingState === "drawWall"
                                ? this.buttonSelected
                                : null
                        }
                    >
                        wall
                    </button>
                    <button
                        onClick={this.toggleDrawParkingSpots}
                        style={
                            this.state.drawingState === "drawParkingSpots"
                                ? this.buttonSelected
                                : null
                        }
                    >
                        parking
                    </button>
                    <button
                        onClick={this.toggleErase}
                        style={
                            this.state.drawingState === "erase"
                                ? this.buttonSelected
                                : null
                        }
                    >
                        erase
                    </button>
                    <button onClick={this.serializeData}>save</button>

                    {/* old home button no dialog */}
                    {/* <NavLink to="/dash">
                        <button className="home"><img src={Home} height="22px" width="22px" /></button>
                    </NavLink> */}
                </div>

                {/*--------------------------below is the shit for rendering-------------------------------------*/}

                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    draggable={this.state.drawingState === "pan"}
                    x={this.state.stage.x}
                    y={this.state.stage.y}
                    scaleX={this.state.scale}
                    scaleY={this.state.scale}
                    onMouseDown={this.startDrawing}
                    onMouseMove={this.sizeDrawing}
                    onDragEnd={this.handleStageDrag}
                    onWheel={this.stageZoom}
                >
                    <Layer id="grid">
                        {[...Array(200)].map((_, i) => (
                            <Line
                                points={[
                                    -5000,
                                    i * 50 - 5000,
                                    5000,
                                    i * 50 - 5000,
                                ]}
                                strokeWidth={0.3}
                                closed
                                stroke={"black"}
                                opacity={0.5}
                                perfectDrawEnabled={false}
                                listening={false}
                            />
                        ))}
                        {[...Array(200)].map((_, i) => (
                            <Line
                                points={[
                                    i * 50 - 5000,
                                    -5000,
                                    i * 50 - 5000,
                                    5000,
                                ]}
                                strokeWidth={0.3}
                                closed
                                stroke={"black"}
                                opacity={0.5}
                                perfectDrawEnabled={false}
                                listening={false}
                            />
                        ))}
                    </Layer>

                    <Layer id="parkingSpots">
                        {/* for staging */}
                        {this.state.stagingParkingLines.map((line, i) => {
                            return (
                                <Line
                                    points={[
                                        line.x1,
                                        line.y1,
                                        line.x2,
                                        line.y2,
                                    ]}
                                    strokeWidth={5}
                                    stroke={"#3D4849"}
                                    perfectDrawEnabled={false}
                                    listening={false}
                                />
                            );
                        })}

                        {this.state.stagingParkingLabel.map((lab, i) => {
                            return (
                                <Text
                                    x={lab.x}
                                    y={lab.y}
                                    width={lab.width}
                                    height={lab.height}
                                    text={lab.text}
                                    align={"center"}
                                    verticalAlign={"middle"}
                                    fontStyle={"bold"}
                                    fill={"#81C784"}
                                    fontSize={lab.size}
                                    rotation={lab.rotation}
                                />
                            );
                        })}
                        {/* normal plot */}
                        {this.state.parkingLines.map((line, i) => {
                            return (
                                <Line
                                    points={[
                                        line.x1,
                                        line.y1,
                                        line.x2,
                                        line.y2,
                                    ]}
                                    strokeWidth={5}
                                    stroke={"#3D4849"}
                                    perfectDrawEnabled={false}
                                    listening={false}
                                />
                            );
                        })}

                        {this.state.parkingLabel.map((lab, i) => {
                            return (
                                <Text
                                    x={lab.x}
                                    y={lab.y}
                                    width={lab.width}
                                    height={lab.height}
                                    text={lab.text}
                                    align={"center"}
                                    verticalAlign={"middle"}
                                    fontStyle={"bold"}
                                    fill={"#81C784"}
                                    fontSize={lab.size}
                                    rotation={lab.rotation}
                                    onClick={
                                        () => console.log(lab.text)
                                    }
                                />
                            );
                        })}
                    </Layer>

                    <Layer id="walls">
                        {this.state.walls.map((wall, i) => {
                            return (
                                <Rect
                                    x={wall.x}
                                    y={wall.y}
                                    width={wall.width}
                                    height={wall.height}
                                    fill="black"
                                    onClick={this.objectClick}
                                />
                            );
                        })}
                        {this.selectionBox ? <Rect /> : null}
                    </Layer>

                    <Layer id="lotRect">
                        <Rect
                            x={this.state.lotRect.x}
                            y={this.state.lotRect.y}
                            width={this.state.lotRect.width}
                            height={this.state.lotRect.height}
                            stroke={"#fda766"}
                            strokeWidth={2}
                            visible={this.state.lotRect.visible}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}
