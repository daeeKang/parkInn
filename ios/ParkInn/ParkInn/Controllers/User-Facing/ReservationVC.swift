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
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var confirmButton: UIButton!

    var lot: Lot!
    var lotDesign: LotDesign!
    var gridScene: GridScene!

    var datePickerIndexPath: IndexPath?
    var inputTexts: [String] = ["From:", "Until:"]
    var inputDates: [Date] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        setupTableView()
        setupGrid()
        fetchLotDesign()

        confirmButton.layer.cornerRadius = confirmButton.frame.height / 2
    }

    private func setupTableView() {
        tableView.delegate = self
        tableView.dataSource = self
        addInitailValues()
    }

    private func setupGrid() {
        gridScene = GridScene(size: spriteView.frame.size)
        spriteView.presentScene(gridScene)
    }

    private func addInitailValues() {
        inputDates = Array(repeating: Date(), count: inputTexts.count)
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
        plotParkingSpots()
        plotParkingLines()
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

extension ReservationVC: UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if datePickerIndexPath != nil {
            return inputTexts.count + 2 + 1
        } else {
            return inputTexts.count + 2
        }
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if datePickerIndexPath == indexPath {
            let datePickerCell = tableView.dequeueReusableCell(withIdentifier: DatePickerTableViewCell.reuseIdentifier()) as! DatePickerTableViewCell
            datePickerCell.updateCell(date: inputDates[indexPath.row - 1], indexPath: indexPath)
            datePickerCell.delegate = self
            datePickerCell.selectionStyle = .none
            return datePickerCell
        } else {
            let dateCell = tableView.dequeueReusableCell(withIdentifier: DateTableViewCell.reuseIdentifier()) as! DateTableViewCell
            dateCell.selectionStyle = .none
            if indexPath.row < inputTexts.count {
                dateCell.updateText(text: inputTexts[indexPath.row], date: inputDates[indexPath.row])
            } else {
                if indexPath.row == inputTexts.count {
                    dateCell.label.text = "Parking Spot:"
                    dateCell.dateLabel.text = "---"
                } else {
                    dateCell.label.text = "Price:"
                    dateCell.dateLabel.text = "---"
                }
            }
            return dateCell
        }
    }

}

extension ReservationVC: UITableViewDelegate {


    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.beginUpdates()
        if let datePickerIndexPath = datePickerIndexPath, datePickerIndexPath.row - 1 == indexPath.row {
            tableView.deleteRows(at: [datePickerIndexPath], with: .fade)
            self.datePickerIndexPath = nil
        } else {
            if let datePickerIndexPath = datePickerIndexPath {
                tableView.deleteRows(at: [datePickerIndexPath], with: .fade)
            }
            datePickerIndexPath = indexPathToInsertDatePicker(indexPath: indexPath)
            tableView.insertRows(at: [datePickerIndexPath!], with: .fade)
            tableView.deselectRow(at: indexPath, animated: true)
        }
        tableView.endUpdates()
    }

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if datePickerIndexPath == indexPath {
            return DatePickerTableViewCell.cellHeight()
        } else {
            return DateTableViewCell.cellHeight()
        }
    }

    private func indexPathToInsertDatePicker(indexPath: IndexPath) -> IndexPath {
        if let datePickerIndexPath = datePickerIndexPath, datePickerIndexPath.row < indexPath.row {
            return indexPath
        } else {
            return IndexPath(row: indexPath.row + 1, section: indexPath.section)
        }
    }

}

extension ReservationVC: DatePickerDelegate {

    func didChangeDate(date: Date, indexPath: IndexPath) {
        inputDates[indexPath.row] = date
        tableView.reloadRows(at: [indexPath], with: .none)
    }

}
