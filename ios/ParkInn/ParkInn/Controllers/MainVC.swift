//
//  MainVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/12/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MaterialComponents

class MainVC: UIViewController {

    @IBOutlet weak var menuButton: UIBarButtonItem!
    @IBOutlet weak var collectionView: UICollectionView!

    private var categories = [Category]()

    private let cornerRadius: CGFloat = 12.0

    fileprivate var dataSource: UICollectionViewDiffableDataSource<Section, Category>! = nil

    override func viewDidLoad() {
        super.viewDidLoad()

        setupCategories()

        configureHierarchy()
        configureDataSource()

        setupMenu()
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
        let events = Category(name: "Events", image: UIImage(systemName: "calendar")!, color: UIColor.PIColors.yellowCardHeader)
        let revenue = Category(name: "Revenue", image: UIImage(systemName: "dollarsign.square.fill")!, color: UIColor.PIColors.greenCardHeader)
        let incidents = Category(name: "Incidents", image: UIImage(systemName: "bell.fill")!, color: UIColor.PIColors.redCardHeader)
        let manage = Category(name: "Manage", image: UIImage(systemName: "car.fill")!, color: UIColor.PIColors.tealCardHeader)
        let stats = Category(name: "Statistics", image: UIImage(systemName: "chart.pie.fill")!, color: UIColor.PIColors.greenCardHeader)


//        categories.append(contentsOf: [manage, revenue, events, incidents])
        categories.append(contentsOf: [stats, manage])
    }

    // MARK: - Segues

    @IBAction func openStatsVC(_ sender: Any) {
        performSegue(withIdentifier: "toStatsVC", sender: nil)
    }

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
                                                       subitem: item, count: 2)
        let spacing = CGFloat(10)
        group.interItemSpacing = .fixed(spacing)

        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = spacing
        section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 10)

        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }

    private func configureHierarchy() {
        collectionView.delegate = self
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.backgroundColor = .clear
        collectionView.collectionViewLayout = createLayout()
        let nib = UINib(nibName: "CategoryCell", bundle: nil)
        collectionView.register(nib, forCellWithReuseIdentifier: "CategoryCell")
    }

    private func configureDataSource() {
        dataSource = UICollectionViewDiffableDataSource<Section, Category>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, category) -> UICollectionViewCell? in
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CategoryCell", for: indexPath) as? CategoryCell else { fatalError("Could not create new cell") }

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
