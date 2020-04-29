//
//  ReservationCell.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/29/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class ReservationCell: UICollectionViewCell {
    @IBOutlet weak var cardView: UIView!

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func awakeFromNib() {
        super.awakeFromNib()
        cardView.layer.cornerRadius = 12.0
    }


}
