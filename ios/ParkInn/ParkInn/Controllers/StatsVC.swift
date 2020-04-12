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
    @IBOutlet weak var pieChartView: PieChartView!
    var lots: [String]!
    var statsObject: CompanyStats!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        APIService.getCompanyStats(companyName:"Flamingo") { Result in
                switch Result {
                    case .success (let result):
                        self.statsObject = result
//                        self.setChart()
                        self.setPieChart()
                    case .failure(let error):
                        print(error.localizedDescription)
                }
            }

        lots = ["Freemont St", "Las Vegas Strip", "Home 3 Space", "Lake Mead Front"]
                
    }
    
    func setChart() {
        print(self.statsObject.totalSpots)
        print(self.statsObject.availableSpots)
        print("does it get here")
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
    
    func setPieChart(){
        let usedSpots = self.statsObject.totalSpots - self.statsObject.availableSpots
        let availableSpots = self.statsObject.availableSpots
        let totalSpots = "Total Spots: \(self.statsObject.totalSpots)"
        print(usedSpots)
        
        var dataEntries: [PieChartDataEntry] = []
        let reservedSpotsEntry = PieChartDataEntry(value: Double(usedSpots), label: "Reserved Spots")
        let availableSpotsEntry = PieChartDataEntry(value: Double(availableSpots), label: "Available Spots")
        
        dataEntries.append(reservedSpotsEntry)
        dataEntries.append(availableSpotsEntry)
        
        let pieChartDataSet = PieChartDataSet(entries: dataEntries, label: totalSpots)
        pieChartView.animate(xAxisDuration: 2.0, yAxisDuration: 2.0)

        pieChartDataSet.colors = colorsOfCharts(numbersOfColor: 2)
        pieChartView.backgroundColor = UIColor(red: 189/255, green: 195/255, blue: 199/255, alpha: 1)

        
        let pieChartData = PieChartData(dataSet: pieChartDataSet)
        let format = NumberFormatter()
        format.numberStyle = .none
        let formatter = DefaultValueFormatter(formatter: format)
        pieChartData.setValueFormatter(formatter)
        
        pieChartView.data = pieChartData

    }
    
    private func colorsOfCharts(numbersOfColor: Int) -> [UIColor] {
      var colors: [UIColor] = []
      for _ in 0..<numbersOfColor {
        let red = Double(arc4random_uniform(256))
        let green = Double(arc4random_uniform(256))
        let blue = Double(arc4random_uniform(256))
        let color = UIColor(red: CGFloat(red/255), green: CGFloat(green/255), blue: CGFloat(blue/255), alpha: 1)
        colors.append(color)
      }
      return colors
    }
}


