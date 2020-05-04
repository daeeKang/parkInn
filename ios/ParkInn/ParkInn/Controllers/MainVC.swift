//
//  MainVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/12/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MaterialComponents
import Charts

class MainVC: UIViewController {

    @IBOutlet weak var menuButton: UIBarButtonItem!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var pieChartView: PieChartView!
    @IBOutlet weak var barChartView: BarChartView!

    private var categories = [Category]()
    var lots: [String]!
    var peakTimeCount = [Int]()
    var statsObject: CompanyStats!

    private let cornerRadius: CGFloat = 12.0

    fileprivate var dataSource: UICollectionViewDiffableDataSource<Section, Category>! = nil

    override func viewDidLoad() {
        super.viewDidLoad()

        setupCategories()

        configureHierarchy()
        configureDataSource()

        setupMenu()
        setupCharts()
    }

    // Sets up the gestures and action for Menu button
    private func setupMenu() {
        self.menuButton.target = self.revealViewController()
        self.menuButton.action = #selector(SWRevealViewController.revealToggle(_:))

        // Add gestures for panning to open/close and tap to close
        self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        self.view.addGestureRecognizer(self.revealViewController().tapGestureRecognizer())
    }

    private func setupCategories() {
        let manage = Category(name: "Parking Lots", image: UIImage(systemName: "car.fill")!, color: UIColor.PIColors.tealCardHeader)

        categories.append(contentsOf: [manage])
    }

    private func setupCharts() {
        pieChartView.layer.cornerRadius = 5.0
        pieChartView.layer.shadowOffset = CGSize(width: 0, height: 1.5)
        pieChartView.layer.shadowOpacity = 0.3
        pieChartView.layer.shadowRadius = 3.0
        pieChartView.layer.shadowColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 1)
        pieChartView.clipsToBounds = true
        pieChartView.showsLargeContentViewer = true

        barChartView.layer.cornerRadius = 5.0
        barChartView.layer.shadowOffset = CGSize(width: 0, height: 1.5)
        barChartView.layer.shadowOpacity = 0.3
        barChartView.layer.shadowRadius = 3.0
        barChartView.layer.shadowColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 1)
        barChartView.clipsToBounds = true

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

        chartDataSet.colors = [.white]

        barChartView.backgroundColor = UIColor.PIColors.lightBlueCardHeader

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

        pieChartDataSet.colors = [UIColor.PIColors.darkTealCardHeader, UIColor.PIColors.mediumGreenCardHeader]
        pieChartView.backgroundColor = UIColor.PIColors.lightBlueCardHeader

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

    // MARK: - Segues
    @IBAction func openManagementVC(_ sender: Any) {
        performSegue(withIdentifier: "toManagementVC", sender: nil)
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if revealViewController().isOpen {
            revealViewController()?.revealToggle(animated: true)
        }
    }
}


// MARK: - UICollectionViewDataSource/Delegate

extension MainVC: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        performSegue(withIdentifier: "toManagementVC", sender: nil)
    }
}

// MARK: - Diffable Datasource and UICollectionViewFlowLayout
extension MainVC {

    func createLayout() -> UICollectionViewLayout {
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                              heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets = NSDirectionalEdgeInsets(top: 5, leading: 5, bottom: 5, trailing: 5)

        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                               heightDimension: .fractionalWidth(0.33))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,
                                                       subitem: item, count: 1)
        let spacing = CGFloat(10)
        group.interItemSpacing = .fixed(spacing)

        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = spacing
        section.contentInsets = NSDirectionalEdgeInsets(top: 16, leading: 10, bottom: 0, trailing: 10)

        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }

    private func configureHierarchy() {
        collectionView.delegate = self
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.backgroundColor = .clear
        collectionView.collectionViewLayout = createLayout()
        let nib = UINib(nibName: "CardCell", bundle: nil)
        collectionView.register(nib, forCellWithReuseIdentifier: "CardCell")
    }

    private func configureDataSource() {
        dataSource = UICollectionViewDiffableDataSource<Section, Category>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, category) -> UICollectionViewCell? in
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CardCell", for: indexPath) as? CardCell else { fatalError("Could not create new cell") }

            cell.configureCell(with: category)

            return cell
        })

        // initial data
        var snapshot = NSDiffableDataSourceSnapshot<Section, Category>()
        snapshot.appendSections([.main])
        snapshot.appendItems(categories)
        dataSource.apply(snapshot, animatingDifferences: false)
    }

}

extension MainVC {
    fileprivate enum Section {
        case main
    }
}
