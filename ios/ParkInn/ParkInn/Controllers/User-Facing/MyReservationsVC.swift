//
//  MyReservationsVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/29/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class MyReservationsVC: UIViewController {

    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var noReservationsLabel: UILabel!

    enum Section {
        case main
    }

    var dataSource: UICollectionViewDiffableDataSource<Section, Reservation>! = nil


    var reservations = [Reservation]()

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        fetchReservations()
        configureCollectionView()
    }

    private func fetchReservations() {
        let email = SessionManager.shared.customerProfile!.username
        APIService.getReservations(email: email) { [unowned self] (result) in
            switch result {
                case .success(let reservations):
                    self.reservations = reservations.filter { $0.expired == false }
                    self.reservations.sort { (lhs, rhs) -> Bool in
                        return lhs.startTime < rhs.startTime
                    }
                    self.createSnapshot()
                    self.noReservationsLabel.isHidden = true
                case .failure:
                    self.noReservationsLabel.isHidden = false
            }
        }
    }

    private func configureCollectionView() {
        configureHierarchy()
        configureDataSource()
    }

}


// MARK: - DiffableDatasource and Layout
extension MyReservationsVC {

    func createLayout() -> UICollectionViewLayout {
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                              heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)

        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.95),
                                               heightDimension: .fractionalHeight(0.8))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,
                                                       subitem: item, count: 1)
        let spacing = CGFloat(20)
        group.interItemSpacing = .fixed(spacing)


        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = spacing
        section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 10)
        section.orthogonalScrollingBehavior = .groupPagingCentered

        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }

    private func configureHierarchy() {
        //           collectionView.delegate = self
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.backgroundColor = .clear
        collectionView.collectionViewLayout = createLayout()
    }
    private func configureDataSource() {
        dataSource = UICollectionViewDiffableDataSource<Section, Reservation>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, reservation) -> UICollectionViewCell? in
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ReservationCell", for: indexPath) as? ReservationCell else { fatalError("Could not create new cell") }

            cell.configureCell(with: reservation)

            return cell
        })

        createSnapshot()
    }

    func createSnapshot() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Reservation>()
        snapshot.appendSections([.main])
        snapshot.appendItems(self.reservations)
        dataSource.apply(snapshot, animatingDifferences: false)
    }

}
