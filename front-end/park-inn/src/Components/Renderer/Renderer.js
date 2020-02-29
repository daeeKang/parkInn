import React from 'react';
import Konva from 'konva';
import './Renderer.css'
import { Stage, Layer, Star, Text, Line } from 'react-konva';

export default class Renderer extends React.Component {
    state = {
        scale: 1,
        stage: {
            draggable: true,
            x: window.innerWidth/2,
            y: window.innerHeight/2
        },
        stars: [
            //this is just filler for now 
            //TO-DO: REMOVE THIS
            {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            },
            {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            },
            {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            },
            {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            },
            {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            },
        ],
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
        if (this.state.stage.draggable)
            this.setState({
                stage: {
                    draggable: true,
                    x: e.target.attrs.x,
                    y: e.target.attrs.y
                }
            })
    }
    resetOrigin = e => {
        this.setState({
            stage: {
                draggable: true,
                x: 0,
                y: 0
            }
        })
    }
    moveStage = e => {
        this.setState({
            stage: {
                draggable: !this.state.stage.draggable,
                x: this.state.stage.x,
                y: this.state.stage.y
            }
        })
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


    //-----------------------------RENDER---:-)-------------------------kill me-----------------------//
    render() {
        return (
            <div>
                <div className='controls'>
                    <p>
                        {this.state.stage.x}, {this.state.stage.y}
                    </p>
                    <button onClick={this.resetOrigin}>
                        reset origin
                    </button>
                    <button onClick={this.moveStage}>
                        move stage
                    </button>
                </div>

                <Stage width={window.innerWidth} height={window.innerHeight}
                    draggable={this.state.stage.draggable}
                    x={this.state.stage.x}
                    y={this.state.stage.y}
                    onDragEnd={this.handleStageDrag}
                    onWheel={this.stageZoom}
                    scaleX={this.state.scale}
                    scaleY={this.state.scale}
                >
                    <Layer>
                        {[...Array(200)].map((_, i) => (
                            <Line
                                points={[-2500, i * 25 - 2500, 2500, i * 25 - 2500]}
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
                                points={[i * 25 - 2500, -2500, i * 25 - 2500, 2500]}
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