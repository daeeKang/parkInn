//
//  StatsVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/13/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import Charts

class StatsVC: UIViewController {
    @IBOutlet weak var barChartView: BarChartView!
    var lots: [String]!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.


        lots = ["Freemont St", "Las Vegas Strip", "Home 3 Space", "Lake Mead Front"]
        let unitsSold:[Double] = [100, 302, 2, 28]
                
        setChart(dataPoints: lots, values: unitsSold)
    }
    
    func setChart(dataPoints: [String], values: [Double]) {
        barChartView.noDataText = "You need to provide data for the chart."
        
        var dataEntries: [BarChartDataEntry] = []
                
        for i in 0..<dataPoints.count {
            let dataEntry = BarChartDataEntry(value: values[i], xIndex: i)
            dataEntries.append(dataEntry)
        }
                
        let chartDataSet = BarChartDataSet(yVals: dataEntries, label: "Lots Reserved")
        let chartData = BarChartData(xVals: lots, dataSet: chartDataSet)
        barChartView.data = chartData
            
    }

}
