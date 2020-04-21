//
//  CategoryCell.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/20/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MaterialComponents.MDCBaseCell

class CategoryCell: MDCBaseCell {

    @IBOutlet weak var squareView: UIView!
    @IBOutlet weak var categoryGlyph: UIImageView!
    @IBOutlet weak var categoryLabel: UILabel!
    @IBOutlet weak var cardView: UIView!

    override func awakeFromNib() {
        super.awakeFromNib()

        self.formatViews()
        self.clipsToBounds = false
        self.layer.masksToBounds = false
    }

    public func configureCell(with category: Category) {
        categoryLabel.text = category.name
        categoryGlyph.image = category.image
        squareView.backgroundColor = category.color
    }

    private func formatViews() {
        // Corner Radii
        squareView.layer.cornerRadius = 5.0
        cardView.layer.cornerRadius = 5.0

        // Shadows
        squareView.layer.shadowOffset = CGSize(width: 0, height: 0)
        squareView.layer.shadowOpacity = 0.3
        squareView.layer.shadowRadius = 5.0
        squareView.layer.shadowColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 1)

        cardView.layer.shadowOffset = CGSize(width: 0, height: 1.5)
        cardView.layer.shadowOpacity = 0.2
        cardView.layer.shadowRadius = 3.0
        cardView.layer.shadowColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 1)
    }

}
