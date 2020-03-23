//
//  ManagementVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/13/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

//classe to manage cell structure
class ManagementVC: UIViewController, UICollectionViewDataSource, UICollectionViewDelegate {

    @IBOutlet private weak var collectionView: UICollectionView!
    
     //test data
     let lotNumber = ["Lot1", "Lot2", "Lot3", "Lot5", "Lot7","Lot1", "Lot2", "Lot3", "Lot5", "Lot7"]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        //set up the amount of columns
        let width = (view.frame.size.width - 20) / 2
        //variable layout to access properties of collectionView
        let layout = collectionView.collectionViewLayout as! UICollectionViewFlowLayout
        
        //size of each cell
        layout.itemSize = CGSize(width: width, height: width)
        //space for all corners of the cell
        layout.sectionInset = UIEdgeInsets(top: 20, left: 5, bottom: 20, right: 5)
        
        
    }
    
    //get number of items in the array
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
           return lotNumber.count
    }
    
    //iterates the cells applying any modifications
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "manageCell", for: indexPath) as! ManagementCVCell
        
        
        cell.DisplayLot.layer.cornerRadius = 30
        cell.DisplayLot.image = UIImage(named: lotNumber[indexPath.row] + ".png")
        cell.LabelLot.textColor = UIColor.black
        cell.LabelLot.text = lotNumber[indexPath.row]
    
        
        return cell
        
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let mainStoryboard:UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        let desVC = mainStoryboard.instantiateViewController(identifier: "DisplayVC") as! DisplayVC
        desVC.image =  UIImage(named: lotNumber[indexPath.row] + ".png")!
        desVC.name = lotNumber[indexPath.row]
        self.navigationController?.pushViewController(desVC, animated: true)
        
        
    }

}
