//
//  DateTableViewCell.swift
//  ParkInn
//
//  Created by Kyle Aquino on 3/24/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

/// Date Format type
enum DateFormatType: String {
    /// Time
    case time = "HH:mm:ss"

    /// Date with hours
    case dateWithTime = "dd-MM-yyyy HH:mm"

    /// Date
    case date = "dd-MMM-yyyy"
}

class DateTableViewCell: UITableViewCell {

    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var dateLabel: UILabel!

    // Reuser identifier
    class func reuseIdentifier() -> String {
        return "DateTableViewCellIdentifier"
    }

    // Cell height
    class func cellHeight() -> CGFloat {
        return 44.0
    }

    // Awake from nib method
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    // Update text
    func updateText(text: String, date: Date) {
        label.text = text
        dateLabel.text = date.convertToString(dateformat: .dateWithTime)
    }

}

extension Date {

    func convertToString(dateformat formatType: DateFormatType) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "MMMM dd, yyyy, h:mm a"
        formatter.amSymbol = "AM"
        formatter.pmSymbol = "PM"

        let newDate = formatter.string(from: self)
        return newDate
    }

}
