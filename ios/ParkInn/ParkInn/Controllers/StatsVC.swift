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
    var peakTimeCount = [Int]()
    var statsObject: CompanyStats!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        APIService.getCompanyStats(companyName:"Flamingo") { Result in
                switch Result {
                    case .success (let result):
                        self.statsObject = result
                        for PeakTime in self.statsObject.peakTimes {
                            self.peakTimeCount.append(PeakTime.count)
                        }
                        self.setPieChart()
                        self.setBarChart()
                    case .failure(let error):
                        print(error.localizedDescription)
                }
            }

        lots = ["Freemont St", "Las Vegas Strip", "Home 3 Space", "Lake Mead Front"]
                
    }
    
    func setBarChart() {
        barChartView.noDataText = "You need to provide data for the chart."
            
            
            let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
            
            var dataEntries: [BarChartDataEntry] = []
            
            for i in 0..<hours.count
           {
            let dataEntry = BarChartDataEntry(x: Double(hours[i]), y: Double(self.peakTimeCount[i]))
                
                dataEntries.append(dataEntry)
            }
            
        let chartDataSet = BarChartDataSet(entries: dataEntries, label: "Reservations Per Hour")
        let chartData = BarChartData(dataSet: chartDataSet)
            
        barChartView.data = chartData
        barChartView.drawValueAboveBarEnabled = true
        barChartView.animate(xAxisDuration: 2.0, yAxisDuration: 2.0)
        
//        chartDataSet.colors = [.white]

        barChartView.backgroundColor = UIColor(red: 189/255, green: 195/255, blue: 199/255, alpha: 1)
        
        }
    
    func setPieChart(){
        let usedSpots = self.statsObject.totalSpots - self.statsObject.availableSpots
        let availableSpots = self.statsObject.availableSpots
        let totalSpots = "Total Spots: \(self.statsObject.totalSpots)"
        
        var dataEntries: [PieChartDataEntry] = []
        let reservedSpotsEntry = PieChartDataEntry(value: Double(usedSpots), label: "Reserved Spots")
        let availableSpotsEntry = PieChartDataEntry(value: Double(availableSpots), label: "Available Spots")
        
        dataEntries.append(reservedSpotsEntry)
        dataEntries.append(availableSpotsEntry)
        
        let pieChartDataSet = PieChartDataSet(entries: dataEntries, label: nil)
        pieChartView.animate(xAxisDuration: 2.0, yAxisDuration: 2.0)
        
        pieChartDataSet.colors = colorsOfCharts(numbersOfColor: 2)
        pieChartView.backgroundColor = UIColor(red: 189/255, green: 195/255, blue: 199/255, alpha: 1)

        pieChartView.centerText = totalSpots
        pieChartView.drawCenterTextEnabled = true
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


