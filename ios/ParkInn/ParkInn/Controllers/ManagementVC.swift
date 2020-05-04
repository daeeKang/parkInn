//
//  ManagementVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/13/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

//classe to manage cell structure
class ManagementVC: UIViewController, UICollectionViewDelegate {

    @IBOutlet private weak var collectionView: UICollectionView!

    var lots = [Lot]()

    fileprivate var dataSource: UICollectionViewDiffableDataSource<Section, Lot>! = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()

        configureHierarchy()
        configureDataSource()

        fetchLots()
    }

    private func fetchLots() {
        let companyID = SessionManager.shared.staffProfile!.companyID
        APIService.getLots(companyID: companyID) { [unowned self] result in
            switch result {
                case .success(let lots):
                    self.lots = lots
                    self.createSnapshot()
                case .failure(let error):
                    print(error.localizedDescription)
            }
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let currentLot = lots[indexPath.row]

        print(currentLot.name)
//        let mainStoryboard:UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
//        let desVC = mainStoryboard.instantiateViewController(identifier: "DisplayVC") as! DisplayVC
//
//        desVC.lot = currentLot
//
//        self.navigationController?.pushViewController(desVC, animated: true)
    }

}

extension ManagementVC {
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
        dataSource = UICollectionViewDiffableDataSource<Section, Lot>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, lot) -> UICollectionViewCell? in
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CardCell", for: indexPath) as? CardCell else { fatalError("Could not create new cell") }

            cell.configureCell(with: lot)

            return cell
        })

        createSnapshot()
    }

    private func createSnapshot() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Lot>()
        snapshot.appendSections([.main])
        snapshot.appendItems(lots)
        dataSource.apply(snapshot, animatingDifferences: false)
    }
}

extension ManagementVC {
    fileprivate enum Section {
        case main
    }
}
