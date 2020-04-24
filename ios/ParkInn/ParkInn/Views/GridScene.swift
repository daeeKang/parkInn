//
//  NodeScene.swift
//  ParkInn
//
//  Created by Kyle Aquino on 3/17/20.
//  Copyright © 2020 Kyle Aquino. All rights reserved.
//

import UIKit
import SpriteKit
import GameplayKit

class GridScene: SKScene {

    var grid: Grid!
    var previousCameraScale = CGFloat()
    var previousCameraPoint = CGPoint.zero
    let cameraNode = SKCameraNode()
    let maxScale: CGFloat = 1.0
    let minScale: CGFloat = 0.02

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override init(size: CGSize) {
        super.init(size: size)

        self.backgroundColor = .clear
    }

    override func sceneDidLoad() {
        self.isUserInteractionEnabled = true
    }

    @objc func pinchGestureAction(_ sender: UIPinchGestureRecognizer) {
        guard let camera = self.camera else {
            return
        }
        if sender.state == .began {
            previousCameraScale = camera.xScale
        }
        let newScale = previousCameraScale * 1 / sender.scale
        if (newScale < maxScale && newScale > minScale) {
            camera.setScale(newScale)
            print(newScale)
        } else if newScale >= maxScale {
            cameraNode.position = CGPoint(x: self.frame.midX, y: self.frame.midY)
        }
    }

    @objc func panGestureAction(_ sender: UIPanGestureRecognizer) {
      // The camera has a weak reference, so test it
      guard let camera = self.camera else {
        return
      }
      // If the movement just began, save the first camera position
      if sender.state == .began {
        previousCameraPoint = camera.position
      }
      // Perform the translation
      let translation = sender.translation(in: self.view)
      let newPosition = CGPoint(
        x: previousCameraPoint.x + (translation.x * -1) * camera.xScale,
        y: previousCameraPoint.y + translation.y * camera.yScale
      )
      camera.position = newPosition
    }

    public func addNode(at position: (x: Int, y: Int)) {
        if grid != nil {
            let block = SKSpriteNode(color: .black, size: CGSize(width: grid.blockSize, height: grid.blockSize))
            block.position = grid.gridPosition(row: position.x, col: position.y)
            grid.addChild(block)
        }
    }

    public func addWall(_ wall: Wall) {
        guard grid != nil else { return }
        let block = SKSpriteNode(color: .black, size: CGSize(width: grid.blockSize * CGFloat(wall.translatedWidth), height: grid.blockSize * CGFloat(wall.translatedHeight)))

        // Get position according to grid
        block.position = grid.gridPosition(row: Int(wall.translatedY), col: Int(wall.translatedX))

        // Set the anchor points according to width and height
        switch (wall.positiveWidth, wall.positiveHeight) {
            case (true, true): // Case 1 (+x, +y)
                // Set Anchor to top left corner
                block.anchorPoint = CGPoint(x: 0, y: 1)
            case (false, false): // Case 2 (-x, -y)
                // Set Anchor to bottom left corner
                block.anchorPoint = CGPoint(x: 1, y: 0)
            case (true, false): // Case 3 (+x, -y)
                // Set Anchor to bottom left corner
                block.anchorPoint = CGPoint(x: 0, y: 0)
            case (false, true): // Case 4 (-x, +y)
                // Set Anchor to top right corner
                block.anchorPoint = CGPoint(x: 1, y: 1)
        }

        if block.texture != nil {
            block.texture!.filteringMode = .nearest
        }

        grid.addChild(block)

    }

    public func addParkingLine(_ parkingLine: ParkingLine) {
        guard grid != nil else { return }

        // Set positions according to grid
        let startPosition = grid.gridPosition(row: Int(parkingLine.translatedY1), col: Int(parkingLine.translatedX1))
        let endPosition = grid.gridPosition(row: Int(parkingLine.translatedY2), col: Int(parkingLine.translatedX2))
        var linePositions = [startPosition, endPosition]

        // Create a shape node using the end points
        let line = SKShapeNode(points: &linePositions, count: 2)
        line.lineWidth = 0.5
        line.strokeColor = .black
        line.isAntialiased = false

        grid.addChild(line)
    }

    public func addParkingLabel(_ parkingLabel: ParkingLabel) {
        guard grid != nil else { return }

        let spotNode = SKSpriteNode(color: .blue, size: CGSize(width: grid.blockSize * CGFloat(parkingLabel.translatedHeight), height: grid.blockSize * CGFloat(parkingLabel.translatedWidth)))
        spotNode.name = "\(parkingLabel.text ?? 123)"
        spotNode.position = grid.gridPosition(row: Int(parkingLabel.translatedY), col: Int(parkingLabel.translatedX - parkingLabel.translatedHeight))

        switch (parkingLabel.positiveWidth, parkingLabel.positiveHeight) {
            case (true, true): // Case 1 (+x, +y)
                // Set Anchor to top left corner
                spotNode.anchorPoint = CGPoint(x: 0, y: 1)
            case (false, false): // Case 2 (-x, -y)
                // Set Anchor to bottom left corner
                spotNode.anchorPoint = CGPoint(x: 1, y: 0)
            case (true, false): // Case 3 (+x, -y)
                // Set Anchor to bottom left corner
                spotNode.anchorPoint = CGPoint(x: 0, y: 0)
            case (false, true): // Case 4 (-x, +y)
                // Set Anchor to top right corner
                spotNode.anchorPoint = CGPoint(x: 1, y: 1)
        }

        if spotNode.texture != nil {
            spotNode.texture!.filteringMode = .nearest
        }

        grid.addChild(spotNode)
    }

    override func didMove(to: SKView) {
        let numRows = 10000
        let numCols = 10000
        let blockSize = self.size.width / CGFloat(numRows)
        if let grid = Grid(blockSize: blockSize, rows: numRows, cols: numCols) {
            grid.position = CGPoint (x:frame.midX, y:frame.midY)
            grid.size = self.size
            addChild(grid)

            self.grid = grid
        }

        cameraNode.position = CGPoint(x: self.frame.midX, y: self.frame.midY)
        addChild(cameraNode)
        camera = cameraNode

        cameraNode.setScale(0.75)

        let pinchGesture = UIPinchGestureRecognizer()
        pinchGesture.addTarget(self, action: #selector(pinchGestureAction(_:)))
        self.view!.addGestureRecognizer(pinchGesture)

        let panGesture = UIPanGestureRecognizer()
        panGesture.addTarget(self, action: #selector(panGestureAction(_:)))
        view?.addGestureRecognizer(panGesture)
    }
}
