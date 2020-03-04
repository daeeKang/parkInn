import React from 'react';
import Konva from 'konva';
import './Renderer.css'
import { Stage, Layer, Star, Text, Line, Rect } from 'react-konva';

export default class Renderer extends React.Component {
    state = {
        scale: 1,
        snappingRatio: 10,
        isDrawing: true,
        isPan: false,
        stage: {
            draggable: true,
            x: (window.innerWidth/2),
            y: window.innerHeight/2
        },
        walls: [

        ], 
        stars: [
            // //this is just filler for now 
            // //TO-DO: REMOVE THIS
            // {
            //     x: Math.random() * window.innerWidth,
            //     y: Math.random() * window.innerHeight
            // },
            // {
            //     x: Math.random() * window.innerWidth,
            //     y: Math.random() * window.innerHeight
            // },
            // {
            //     x: Math.random() * window.innerWidth,
            //     y: Math.random() * window.innerHeight
            // },
            // {
            //     x: Math.random() * window.innerWidth,
            //     y: Math.random() * window.innerHeight
            // },
            // {
            //     x: Math.random() * window.innerWidth,
            //     y: Math.random() * window.innerHeight
            // },
        ],
    }

    //H3LP3R FUNCT1ONSS ----------------------------------------------------------------------------------------------------------------------------
    snapGrid(roundTo, num){
        let rem = num % roundTo;
        if(rem < roundTo / 2){
            return num - rem;
        } else {
            return num + (roundTo - rem);
        }
    }

    //EVENT HANDLERS DOWN BELOOOOWW-----------------------------------------------------------------------------------------------------------------
    //this is star stuff we will remove this
    handleDragStart = e => {
        e.target.setAttrs({
            shadowOffset: {
                x: 15,
                y: 15
            },
            scaleX: 1.1,
            scaleY: 1.1
        });
        this.setState({
            isPan: false
        })
    };
    handleDragEnd = e => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    };
    //stage handeling
    handleStageDrag = e => {
        if (this.state.isPan){
            this.setState({
                stage: {
                    draggable: true,
                    x: e.target.attrs.x,
                    y: e.target.attrs.y
                }
            });
        }
    }
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
    
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    
        this.setState({
          scale: newScale,
          stage: {
            draggable: this.state.stage.draggable,
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
          }
        });
    }

    isPaint = false;
    startDrawing = e => {
        //create rectangle
        if(!this.state.isDrawing) return;
        
        if(this.isPaint){
            this.isPaint = false;
            return;
        }

        let walls = this.state.walls;
        walls.push({
            x: this.snapGrid(this.state.snappingRatio, e.evt.layerX - this.state.stage.x),
            y: this.snapGrid(this.state.snappingRatio, e.evt.layerY - this.state.stage.y),
            width: 0,
            height: 0
        })
        this.setState({
            walls: walls
        })
        console.log(walls);
        this.isPaint = true;
    }
    sizeDrawing = e => {
        if(!this.state.isDrawing || !this.isPaint) return;
        
        let walls = this.state.walls;
        let wall = walls[walls.length - 1];
        wall.width = this.snapGrid(this.state.snappingRatio, e.evt.layerX - this.state.stage.x - wall.x);
        wall.height = this.snapGrid(this.state.snappingRatio, e.evt.layerY - this.state.stage.y - wall.y);
        
        this.setState({
            walls: walls
        });
    }
    //---------------------------BUTTON TYPA TINGZ--------------------------------//
    resetOrigin = e => {
        this.setState({
            stage: {
                draggable: true,
                x: 0,
                y: 0
            }
        })
    }
    toggleMoveStage = e => {
        this.setState({
            isPan: !this.state.isPan,
            isDrawing: false,
            stage: {
                x: this.state.stage.x,
                y: this.state.stage.y
            }
        })
    }
    toggleDrawingMode = e => {
        this.setState({
            isDrawing: !this.state.isDrawing,
            isPan: false
        });
    }


    //-----------------------------RENDER---:-)-------------------------kill me-----------------------//
    render() {
        return (
            <div>
                <div className='controls'>
                    <p>
                        {this.state.stage.x}, {this.state.stage.y}
                    </p>
                    <button onClick={this.resetOrigin} >
                        reset origin
                    </button>
                    <button onClick={this.toggleMoveStage}>
                        move stage
                    </button>
                    <button onClick={this.toggleDrawingMode}>
                        drawing mode 
                    </button>
                </div>

                <Stage width={window.innerWidth} height={window.innerHeight}
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
                                points={[-2500, i * 50 - 2500, 2500, i * 50 - 2500]}
                                strokeWidth={.3}
                                closed
                                stroke={'#add8e6'}
                                opacity={0.5}
                                perfectDrawEnabled={false}
                                listening={false}
                            />
                        ))}
                        {[...Array(200)].map((_, i) => (
                            <Line
                                points={[i * 50 - 2500, -2500, i * 50 - 2500, 2500]}
                                strokeWidth={.3}
                                closed
                                stroke={'#add8e6'}
                                opacity={0.5}
                                perfectDrawEnabled={false}
                                listening={false}
                            />
                        ))}
                    </Layer>

                    <Layer>
                        {this.state.walls.map((wall, i) => {
                            return <Rect
                                x={wall.x}
                                y={wall.y}
                                width={wall.width}
                                height={wall.height}
                                fill="black"
                            />
                        })}
                    </Layer>
                    <Layer>
                        {this.state.stars.map((star, i) => (
                            <Star
                                key={i}
                                x={star.x}
                                y={star.y}
                                numPoints={5}
                                innerRadius={20}
                                outerRadius={40}
                                fill="#89b717"
                                opacity={0.8}
                                draggable
                                rotation={Math.random() * 180}
                                shadowColor="black"
                                shadowBlur={10}
                                shadowOpacity={0.6}
                                onDragStart={this.handleDragStart}
                                onDragEnd={this.handleDragEnd}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>

        );
    }
}