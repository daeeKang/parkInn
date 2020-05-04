//
//  SearchResultCell.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/12/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MaterialComponents.MDCInkView

class SearchResultCell: UITableViewCell {

    var lot: Lot!

    @IBOutlet weak var lotImage: UIImageView!
    @IBOutlet weak var lotNameLabel: UILabel!
    @IBOutlet weak var availableSpotsLabel: UILabel!
    @IBOutlet weak var distanceLabel: UILabel!

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    func configureCell(with lot: Lot) {
        self.lot = lot

        lotNameLabel.text = lot.name
        availableSpotsLabel.text = "Available Spots: \(lot.availableSpots)"

        if lot.distanceToUser != nil {
            distanceLabel.text = String(format: "%.1f mi", lot.distanceToUser!)
            distanceLabel.isHidden = false
        }

        if lot.image == nil {
            if let urlString = lot.imageURL,
                let imageURL = URL(string: urlString) {
                UIImageView.load(url: imageURL) { [unowned self] (image) in
                    if image != nil {
                        DispatchQueue.main.async {
                            lot.image = image
                            self.lotImage.image = image
                        }
                    }
                }
//                lot.image = lotImage.image
            }
        } else {
            lotImage.image = lot.image!
        }
    }

    override func prepareForReuse() {
        lotImage.image = nil
    }


}
