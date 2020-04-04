import React from "react";
import Konva from "konva";
import Modal from "react-modal";
import axios from "axios";
import "./Renderer.css";
import { Stage, Layer, Star, Text, Line, Rect } from "react-konva";

export default class Renderer extends React.Component {
    state = {
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

        //dev
        cursorLocation: {
            x: 0,
            y: 0,
        },
        parkingCount: 123,
    };

    componentDidMount() {
        this.loadData();
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
        axios
            .post("http://localhost:8000/Lot/UpdateLotDesign", {
                companyid: "8e9fe90e-bd10-48d2-8084-8f259157c832",
                lotid: 1,
                design: out,
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    loadData = () => {
        axios
            .get("http://localhost:8000/Lot/GetLotDesign", {
                params: {
                    companyid: "8e9fe90e-bd10-48d2-8084-8f259157c832",
                    lotid: 1,
                },
            })
            .then((res) => {
                let parsed = res.data;
                this.setState({
                    walls: parsed.walls,
                    parkingLines: parsed.parkingLines,
                    parkingLabel: parsed.parkingLabel,
                });
            })
            .catch((err) => {
                console.log(err);
            });
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

    openParkingLotForm = (coords) => {
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
                    ),
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
                    },
                });

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
            case "down": {
                for (let i = 0; i < num; i++) {
                    labels.push({
                        x: origx + (dimensions.width / num) * i,
                        y: origy + dimensions.height - 20,
                        width: dimensions.width / num,
                        height: dimensions.width / num / 2,
                        text: ++inText,
                        rotation: 0
                    });
                }
                break;
            }
            case "up":{
                for (let i = 0; i < num; i++) {
                    labels.push({
                        x: origx + (dimensions.width / num) * i,
                        y: origy,
                        width: dimensions.width / num,
                        height: dimensions.width / num / 2,
                        text: ++inText,
                        rotation: 0
                    });
                }
            }
            case "right": {
                for (let i = 0; i < num; i++) {
                    labels.push({
                        y: origy + (dimensions.height / num) * (i + 1),
                        x: origx + dimensions.width - 20,
                        width: dimensions.height / num,
                        height: dimensions.height / num / 2,
                        text: ++inText,
                        rotation: 270
                    });
                }  
                break;
            }
            case "left": {
                for (let i = 0; i < num; i++) {
                    labels.push({
                        y: origy + (dimensions.height / num) * i,
                        x: origx + 20,
                        width: dimensions.height / num,
                        height: dimensions.height / num / 2,
                        text: ++inText,
                        rotation: 90
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
    };
    toggleDrawParkingSpots = (e) => {
        this.changeDrawingState("drawParkingSpots");
    };
    toggleErase = (e) => {
        this.changeDrawingState("erase");
    };
    changeOrient = async (orient) => {
        console.log(orient);
        await this.setState({
            orient: orient
        });
        this.drawParkingSpots(this.state.numOfSpaces);
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
        backgroundColor: "#ffd8b9",
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
                <div
                    className="parkingLotForm"
                    style={
                        this.state.showParkingLotForm
                            ? this.parkingLotFormOpen
                            : null
                    }
                >
                    <div className="formContainer">
                        Orientation:
                        <div>
                            <div>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("down")}
                                    style={
                                        this.state.orient === "down"
                                            ? this.buttonSelected
                                            : null
                                    }
                                >
                                    <svg
                                        id="orientDown"
                                        className="parkingOrientSvg"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 270.37 464.81"
                                    >
                                        <polyline points="10 464.81 10 10 260.37 10 260.37 464.81" />
                                    </svg>
                                </button>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("up")}
                                    style={
                                        this.state.orient === "up"
                                            ? this.buttonSelected
                                            : null
                                    }
                                >
                                    <svg
                                        id="orientUp"
                                        className="parkingOrientSvg"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 270.37 464.81"
                                    >
                                        <polyline points="10 464.81 10 10 260.37 10 260.37 464.81" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("right")}
                                    style={
                                        this.state.orient === "right"
                                            ? this.buttonSelected
                                            : null
                                    }
                                >
                                    <svg
                                        id="orientRight"
                                        className="parkingOrientSvg"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 270.37 464.81"
                                    >
                                        <polyline points="10 464.81 10 10 260.37 10 260.37 464.81" />
                                    </svg>
                                </button>
                                <button
                                    className="orientButton"
                                    onClick={() => this.changeOrient("left")}
                                    style={
                                        this.state.orient === "left"
                                            ? this.buttonSelected
                                            : null
                                    }
                                >
                                    <svg
                                        id="orientLeft"
                                        className="parkingOrientSvg"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 270.37 464.81"
                                    >
                                        <polyline points="10 464.81 10 10 260.37 10 260.37 464.81" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        num of spaces:
                        <input
                            type="text"
                            id="numOfSpaces"
                            className="formInput"
                            value={this.state.numOfSpaces}
                            onChange={this.parkingFormChange}
                        />
                        <br />
                        <br />
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
                            onClick={this.parkingFormChange}
                        >
                            nah
                        </button>
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
                    <button onClick={this.loadData}>load</button>
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
                                    text={lab.text}
                                    align={"center"}
                                    fontStyle={"bold"}
                                    fontSize={20}
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
                                    text={lab.text}
                                    align={"center"}
                                    fontStyle={"bold"}
                                    fontSize={20}
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
