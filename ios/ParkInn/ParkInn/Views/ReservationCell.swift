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
        self.clipsToBounds = false
        cardView.layer.cornerRadius = 12.0
        cardView.layer.shadowColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 1)
        cardView.layer.shadowRadius = 5.0
        cardView.layer.shadowOffset = CGSize(width: 0, height: 3.0)
        cardView.layer.shadowOpacity = 0.4
    }

    public func configureCell(with reservation: Reservation) {
        self.reservation = reservation
        self.locationLabel.text = reservation.lotID
        self.parkingSpotLabel.text = reservation.spotID
        self.fromLabel.text = formatDate(from: reservation.startTime)
        self.untilLabel.text = formatDate(from: reservation.endTime)
        self.nameLabel.text = SessionManager.shared.customerProfile!.fullName

        let image = generateQRCode(from: reservation._id)
        self.QRCodeImageView.image = image
    }

    func generateQRCode(from string: String) -> UIImage? {
        let data = string.data(using: String.Encoding.ascii)

        if let filter = CIFilter(name: "CIQRCodeGenerator") {
            filter.setValue(data, forKey: "inputMessage")
            let transform = CGAffineTransform(scaleX: 3, y: 3)

            if let output = filter.outputImage?.transformed(by: transform) {
                return UIImage(ciImage: output)
            }
        }

        return nil
    }

    func formatDate(from dateString: String) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.amSymbol = "AM"
        formatter.pmSymbol = "PM"
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

        let tempDate = formatter.date(from: dateString)!
        formatter.dateFormat = "M/d/yy, h:mm a"
        return formatter.string(from: tempDate)
    }

}
