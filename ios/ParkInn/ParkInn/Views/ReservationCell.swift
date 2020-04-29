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
    @IBOutlet weak var QRCodeImageView: UIImageView!
    @IBOutlet weak var locationLabel: UILabel!
    @IBOutlet weak var parkingSpotLabel: UILabel!
    @IBOutlet weak var fromLabel: UILabel!
    @IBOutlet weak var untilLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!

    var reservation: Reservation!

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func awakeFromNib() {
        super.awakeFromNib()
        cardView.layer.cornerRadius = 12.0
    }

    public func configureCell(with reservation: Reservation) {
        self.reservation = reservation
        self.locationLabel.text = reservation.lotID
        self.parkingSpotLabel.text = reservation.spotID
        self.fromLabel.text = reservation.startTime
        self.untilLabel.text = reservation.endTime
        self.nameLabel.text = SessionManager.shared.customerProfile!.fullName
    }


}
