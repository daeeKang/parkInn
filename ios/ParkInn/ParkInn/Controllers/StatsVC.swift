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
    var statsObject: CompanyStats!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        APIService.getCompanyStats(companyName:"Flamingo") { Result in
                switch Result {
                    case .success (let result):
                        self.statsObject = result
                        self.setChart()
                    case .failure(let error):
                        print(error.localizedDescription)
                }
            }

        lots = ["Freemont St", "Las Vegas Strip", "Home 3 Space", "Lake Mead Front"]
                
    }
    
    func setChart() {
        print(self.statsObject)
        barChartView.noDataText = "You need to provide data for the chart."
            
            let unitsSold = [20.0, 4.0, 6.0, 3.0, 12.0, 16.0, 4.0, 18.0, 2.0, 4.0, 5.0, 4.0]
            
            let test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            
            var dataEntries: [BarChartDataEntry] = []
            
            for i in 0..<lots.count
           {
                let dataEntry = BarChartDataEntry(x: Double(test[i]), y: Double(unitsSold[i]))
                
                dataEntries.append(dataEntry)
            }
            
        let chartDataSet = BarChartDataSet(entries: dataEntries, label: "Reservation count")
        let chartData = BarChartData(dataSet: chartDataSet)
            
            barChartView.data = chartData
        
        barChartView.animate(xAxisDuration: 2.0, yAxisDuration: 2.0)
        
        chartDataSet.colors = [.white]

        barChartView.backgroundColor = UIColor(red: 189/255, green: 195/255, blue: 199/255, alpha: 1)
        
        }

    }


