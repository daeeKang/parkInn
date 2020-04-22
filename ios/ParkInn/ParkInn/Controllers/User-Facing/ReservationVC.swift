//
//  ReservationVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/22/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import SpriteKit
import GameplayKit

class ReservationVC: UIViewController {

    @IBOutlet weak var spriteView: SKView!

    var lot: Lot!
    var lotDesign: LotDesign!
    var gridScene: GridScene!

    override func viewDidLoad() {
        super.viewDidLoad()

        setupGrid()
        fetchLotDesign()
    }

    private func setupGrid() {
        gridScene = GridScene(size: spriteView.frame.size)
        spriteView.presentScene(gridScene)
    }

    private func fetchLotDesign() {
        APIService.getLotDesign(companyID: lot.companyID, lotID: "\(lot.lotID)") { [unowned self] result in
            switch result {
                case .success(let lotDesign):
                    self.lotDesign = lotDesign
                    print(lotDesign)
                    self.plotNodes()
                case .failure(let error):
                    fatalError(error.localizedDescription)
            }
        }
    }

    func plotNodes() {
        plotWalls()
        plotParkingLines()
        plotParkingSpots()
    }

    private func plotWalls() {
        for wall in lotDesign.walls {
            gridScene.addWall(wall)
            print("OG: (\(wall.x), \(wall.y)) | Placed At: (\(wall.translatedX), \(wall.translatedY)) | Width: \(wall.width) Height: \(wall.height) | Translated Width: \(wall.translatedWidth) Height:\(wall.translatedHeight)")
        }
    }

    private func plotParkingLines() {
        for parkingLine in lotDesign.parkingLines {
            gridScene.addParkingLine(parkingLine)
        }
    }

    private func plotParkingSpots() {
        for parkingLabel in lotDesign.parkingLabel {
            gridScene.addParkingLabel(parkingLabel)
        }
    }

}
