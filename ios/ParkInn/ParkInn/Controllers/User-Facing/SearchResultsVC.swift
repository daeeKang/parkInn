//
//  SearchResultsVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/12/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MaterialComponents.MaterialTextFields

class SearchResultsVC: BottomSheetController {

    @IBOutlet weak var searchTextField: MDCTextField!
    @IBOutlet weak var tableView: UITableView!
    weak var mapVC: MapVC!

    public var lotsToDisplay = [Lot]() {
        didSet {
            if dataSource != nil {
                createSnapshot()
            }
        }
    }

    private var dataSource: UITableViewDiffableDataSource<Section, Lot>!

    override var onScrollDown: (() -> ())? {
        return closeTextField
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        setupSearchBar()
        configureDataSource()
        self.view.roundCorners(corners: [.topLeft, .topRight], radius: 12)
        autoDetectedScrollView = tableView
        scrollViews = [tableView]
        setupGestures()
        self.view.isUserInteractionEnabled = true
    }

    private func setupSearchBar() {
        searchTextField.delegate = self
        let searchImage = UIImageView(image: UIImage(systemName: "magnifyingglass"))
        searchImage.tintColor = UIColor.lightText
        searchTextField.leadingView = searchImage
        searchTextField.leadingViewMode = .unlessEditing
        searchTextField.textColor = UIColor.lightGray
        searchTextField.placeholderLabel.textColor = UIColor.lightText
    }

    // MARK: - BottomSheetController Setup
    override var topYPercentage: CGFloat {
        return 0.55
    }

    override var topInset: CGFloat {
        return 0
    }

    override var middleYPercentage: CGFloat {
        return 0.55
    }

    override var bottomYPercentage: CGFloat {
        return 0.20
    }

    override var initialPosition: SheetPosition {
        return .bottom
    }

}


extension SearchResultsVC: UITextFieldDelegate {
    func textFieldDidBeginEditing(_ textField: UITextField) {
        self.changePosition(to: .top)
    }

    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()

        return true
    }

    func closeTextField() {
        self.searchTextField.resignFirstResponder()
    }
}

extension SearchResultsVC: UITableViewDelegate {

    private func configureDataSource() {
        tableView.delegate = self
        dataSource = UITableViewDiffableDataSource<Section, Lot>(tableView: tableView, cellProvider: { (tableView, indexPath, lot) -> UITableViewCell? in

            guard let cell = tableView.dequeueReusableCell(withIdentifier: "searchResultCell", for: indexPath) as? SearchResultCell else { return nil }

            cell.configureCell(with: lot)

            return cell


        })
    }

    private func createSnapshot() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Lot>()

        snapshot.appendSections([.main])
        snapshot.appendItems(lotsToDisplay)
        dataSource.apply(snapshot, animatingDifferences: true)
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("YEEE")
        if let cell = tableView.cellForRow(at: indexPath) as? SearchResultCell {
            mapVC.performSegue(withIdentifier: "toLotVC", sender: cell.lot)
        }
    }

    fileprivate enum Section {
        case main
    }
}
