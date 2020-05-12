//
//  Pannable.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/8/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

public protocol Pannable {
    func attach(to parent: UIViewController)
    func detach()
}
 
