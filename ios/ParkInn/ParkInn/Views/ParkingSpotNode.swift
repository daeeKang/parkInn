//
//  ParkingSpotNode.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/28/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import SpriteKit

class ParkingSpotNode: SKSpriteNode {
    weak var delegate: ParkingSpotDelegate?

    var defaultColor: UIColor! = .blue
    var selectedColor: UIColor! = .red

    var parkingSpot: Spot!
    var isSelected = false

    func updateColor() {
        self.color = isSelected ? selectedColor : defaultColor
    }
}

protocol ParkingSpotDelegate: class {
    func parkingSpotSelected(_ parkingSpot: Spot)
    func parkingSpotDeselected()
}
