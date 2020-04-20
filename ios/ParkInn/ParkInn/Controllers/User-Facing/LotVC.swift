//
//  LotVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 3/1/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MapKit
import Charts
import MaterialComponents.MDCButton

class LotVC: UIViewController {

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var lotImage: UIImageView!
    @IBOutlet weak var distanceLabel: UILabel!
    @IBOutlet weak var mapView: MKMapView!
    @IBOutlet weak var peakTimesGraph: BarChartView!
    @IBOutlet weak var reserveButton: UIButton!

    var lot: Lot!

    override func viewDidLoad() {
        super.viewDidLoad()

        populateView()
        setBarChart()

// REFACTOR LATER
        peakTimesGraph.layer.cornerRadius = 12.0
        peakTimesGraph.clipsToBounds = true
        mapView.layer.cornerRadius = 12.0
        reserveButton.layer.cornerRadius = reserveButton.frame.height / 2

    }

    private func populateView() {
        // Populate the labels with Lot information
        nameLabel.text = lot.name ?? "Lot \(lot.lotID)"
        descriptionLabel.text = lot.companyName

        if lot.distanceToUser != nil {
            distanceLabel.text = String(format: "%.1f mi", lot.distanceToUser!)
            distanceLabel.isHidden = false
        }

        // If an imageURL was retrieved, load it into lotImage
        if lot.image != nil {
            lotImage.image = lot.image
        } else {
            if let urlString = lot.imageURL,
                let imageURL = URL(string: urlString) {
                lotImage.load(url: imageURL)
            }
        }
    }

    func setBarChart() {
        peakTimesGraph.noDataText = "You need to provide data for the chart."


        let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        let fakeData = [0, 0, 0, 10, 30, 40, 50, 70, 70, 70, 60, 30, 30, 80, 80, 90, 100, 70, 30, 20, 10, 0, 0, 0]

        var dataEntries: [BarChartDataEntry] = []

        for i in 5 ..< hours.count - 3
        {
//            let dataEntry = BarChartDataEntry(x: Double(hours[i]), y: Double(lot.peakTimes[i].count))
            let dataEntry = BarChartDataEntry(x: Double(hours[i]), y: Double(fakeData[i]))

            dataEntries.append(dataEntry)
        }

        let chartDataSet = BarChartDataSet(entries: dataEntries, label: "Reservations Per Hour")
        chartDataSet.drawValuesEnabled = false
        let chartData = BarChartData(dataSet: chartDataSet)

        peakTimesGraph.data = chartData

        peakTimesGraph.drawGridBackgroundEnabled = false
        peakTimesGraph.autoScaleMinMaxEnabled = true
        peakTimesGraph.xAxis.drawGridLinesEnabled = false
        peakTimesGraph.xAxis.labelPosition = .bottom
        peakTimesGraph.leftAxis.enabled = false
        peakTimesGraph.rightAxis.enabled = false
        peakTimesGraph.legend.enabled = false

        let months = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]
        peakTimesGraph.xAxis.valueFormatter = IndexAxisValueFormatter(values:months)
        peakTimesGraph.xAxis.granularity = 1

        peakTimesGraph.rightAxis.drawZeroLineEnabled = true

        peakTimesGraph.animate(xAxisDuration: 2.0, yAxisDuration: 2.0)

        //        chartDataSet.colors = [.white]

        peakTimesGraph.backgroundColor = UIColor.PIColors.lightBlueCardHeader
        chartDataSet.colors = [UIColor.white]

    }

    @IBAction func getDirectionsPressed(_ sender: Any) {
        // Open in Maps App
        guard lot != nil else { return }
        let coordinate = CLLocationCoordinate2D(latitude: lot!.location.latitude, longitude: lot!.location.longitude)
        openMaps(for: coordinate)
    }

    private func openMaps(for coordinate: CLLocationCoordinate2D) {
        let regionDistance: CLLocationDistance = 10000
        let regionSpan = MKCoordinateRegion(center: coordinate, latitudinalMeters: regionDistance, longitudinalMeters: regionDistance)
        let options = [
            MKLaunchOptionsMapCenterKey: NSValue(mkCoordinate: regionSpan.center),
            MKLaunchOptionsMapSpanKey: NSValue(mkCoordinateSpan: regionSpan.span)
        ]
        let placemark = MKPlacemark(coordinate: coordinate, addressDictionary: nil)
        let mapItem = MKMapItem(placemark: placemark)

        mapItem.name = nameLabel.text!
        mapItem.openInMaps(launchOptions: options)
    }
}
