//
//  StatisticsVCell.swift
//  ParkInn
//
//  Created by John Hanifzai on 3/8/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import Charts

class StatisticsVCell: UICollectionViewCell {
    let players = [ "Ozil", "Ramsey", "Laca", "Auba", "Xhaka", "Torreira", ]
    
    let goals = [6, 8, 26, 30, 8, 10]
    
    @IBOutlet weak var barChartView: BarChartView!
    
    func viewDidLoad() {
      customizeChart(dataPoints: players, values: goals.map{ Double($0) })
    }
    
    func customizeChart(dataPoints: [String], values: [Double]) {
    
        var dataEntries: [BarChartDataEntry] = []
        for i in 0..<dataPoints.count {
          let dataEntry = BarChartDataEntry(x: Double(i), y: Double(values[i]))
          dataEntries.append(dataEntry)
        }
        let chartDataSet = BarChartDataSet(entries: dataEntries, label: "Bar Chart View")
        let chartData = BarChartData(dataSet: chartDataSet)
        barChartView.data = chartData
    
    }
}
