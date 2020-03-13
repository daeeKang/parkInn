import React from "react";
import Konva from "konva";
import "./Renderer.css";
import { Stage, Layer, Star, Text, Line, Rect } from "react-konva";

export default class Renderer extends React.Component {
    state = {
        scale: 1,
        snappingRatio: 10,
        isDrawing: true,
        isPan: false,
        isDrawParkingLot: false,
        stage: {
            draggable: true,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        walls: []
    };

    //H3LP3R FUNCT1ONSS ----------------------------------------------------------------------------------------------------------------------------
    snapGrid(roundTo, num) {
        let rem = num % roundTo;
        if (rem < roundTo / 2) {
            return num - rem;
        } else {
            return num + (roundTo - rem);
        }
    }

    getRelativePointerPosition = node => {
        // the function will return pointer position relative to the passed node
        var transform = node.getAbsoluteTransform().copy();
        // to detect relative position we need to invert transform
        transform.invert();

        // get pointer (say mouse or touch) position
        var pos = node.getPointerPosition();

        // now we find relative point
        return transform.point(pos);
    };

    //EVENT HANDLERS DOWN BELOOOOWW-----------------------------------------------------------------------------------------------------------------
    //stage handeling
    handleStageDrag = e => {
        if (this.state.isPan) {
            this.setState({
                stage: {
                    draggable: true,
                    x: e.target.attrs.x,
                    y: e.target.attrs.y
                }
            });
        }
    };

    //disable this for now sh1t is w0nky

    stageZoom = e => {
        //this is code copied from stack overflow dont ask me how it works lol
        e.evt.preventDefault();

        const scaleBy = 1.08;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
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
                    ) * newScale
            }
        });

        console.log(this.state.stage.x, this.state.stage.y);
    };

    //variables used for drawing
    isPaint = false;
    selectionBox = null;

    startDrawing = e => {
        //create rectangle
        if (this.state.isDrawing) {
            if (this.isPaint) {
                //we finish painting object
                this.isPaint = false;
                let walls = this.state.walls;
                let wall = walls[walls.length - 1];
                if (wall.width === 0 || wall.height === 0) {
                    walls.pop();
                }
                this.setState({
                    walls: walls
                });
                return;
            }

            let stage = e.target.getStage();
            let walls = this.state.walls;

            let pos = this.getRelativePointerPosition(stage);
            walls.push({
                x: this.snapGrid(this.state.snappingRatio, pos.x),
                y: this.snapGrid(this.state.snappingRatio, pos.y),
                width: 0,
                height: 0
            });
            this.setState({
                walls: walls
            });
            console.log(walls);
            this.isPaint = true;
        } else if (this.state.isDrawParkingLot) {
            let stage = e.target.getStage();
            this.selectionBox.x = this.snapGrid(
                this.state.snappingRatio,
                stage.getPointerPosition().x - this.state.stage.x
            );
            this.selectionBox.y = this.snapGrid(
                this.state.snappingRatio,
                stage.getPointerPosition().y - this.state.stage.y
            );
        } else {
            return;
        }
    };
    sizeDrawing = e => {
        if (!this.isPaint) return;

        if (this.state.isDrawing) {
            let walls = this.state.walls;
            let wall = walls[walls.length - 1];
            let stage = e.target.getStage();
            let pos = this.getRelativePointerPosition(stage);
            wall.width = this.snapGrid(this.state.snappingRatio, pos.x);
            wall.height = this.snapGrid(this.state.snappingRatio, pos.y);

            this.setState({
                walls: walls
            });
        } else if (this.state.isDrawParkingLot) {
        } else return;
    };

    //---------------------------BUTTON TYPA TINGZ--------------------------------//
    resetOrigin = e => {
        this.setState({
            stage: {
                draggable: true,
                x: 0,
                y: 0
            }
        });
    };
    toggleMoveStage = e => {
        this.setState({
            isPan: !this.state.isPan,
            isDrawing: false,
            isDrawParkingLot: false,
            stage: {
                x: this.state.stage.x,
                y: this.state.stage.y
            }
        });
    };
    toggleDrawingMode = e => {
        this.isPaint = false; //this is for when a user clicks a button while drawing a square so end the drawing ja feel
        this.setState({
            isDrawing: !this.state.isDrawing,
            isDrawParkingLot: false,
            isPan: false
        });
    };
    toggleDrawParkingLots = e => {
        this.isPaint = false;
        this.setState({
            isDrawing: false,
            isDrawParkingLot: !this.state.isDrawParkingLot,
            isPan: false
        });
    };

    //-----------------------------STATE BASED STYLING------------------------------------------------//
    buttonSelected = {
        background: '#b3e1ff'
    }

    //-----------------------------RENDER---:-)-------------------------kill me-----------------------//
    render() {
        return (
            <div>
                <div className="devBox">
                    <p>dev console</p>
                    <p>
                        stage pos:
                        {this.state.stage.x}, {this.state.stage.y}
                    </p>
                </div>
                <div className="controls">
                <button onClick={this.resetOrigin}>reset</button>
                    <button onClick={this.toggleMoveStage} style={this.state.isPan ? this.buttonSelected: null}>move</button>
                    <button onClick={this.toggleDrawingMode}  style={this.state.isDrawing ? this.buttonSelected: null}>
                        wall
                    </button>
                    <button onClick={this.toggleDrawParkingLots}>
                        parking
                    </button>
                </div>

                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    draggable={this.state.isPan}
                    x={this.state.stage.x}
                    y={this.state.stage.y}
                    scaleX={this.state.scale}
                    scaleY={this.state.scale}
                    onMouseDown={this.startDrawing}
                    onMouseMove={this.sizeDrawing}
                    onDragEnd={this.handleStageDrag}
                    onWheel={this.stageZoom}
                >
                    <Layer>
                        {[...Array(200)].map((_, i) => (
                            <Line
                                points={[
                                    -2500,
                                    i * 50 - 2500,
                                    2500,
                                    i * 50 - 2500
                                ]}
                                strokeWidth={0.3}
                                closed
                                stroke={"#add8e6"}
                                opacity={0.5}
                                perfectDrawEnabled={false}
                                listening={false}
                            />
                        ))}
                        {[...Array(200)].map((_, i) => (
                            <Line
                                points={[
                                    i * 50 - 2500,
                                    -2500,
                                    i * 50 - 2500,
                                    2500
                                ]}
                                strokeWidth={0.3}
                                closed
                                stroke={"#add8e6"}
                                opacity={0.5}
                                perfectDrawEnabled={false}
                                listening={false}
                            />
                        ))}
                    </Layer>

                    <Layer>
                        {this.state.walls.map((wall, i) => {
                            return (
                                <Rect
                                    x={wall.x}
                                    y={wall.y}
                                    width={wall.width}
                                    height={wall.height}
                                    fill="black"
                                />
                            );
                        })}
                        {this.selectionBox ? <Rect /> : null}
                    </Layer>
                </Stage>
            </div>
        );
    }
}
