//
//  BottomSheetController.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/8/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

public enum SheetPosition{
    case top, bottom, middle
}

open class BottomSheetController: UIViewController {

    var onScrollDown: (() -> ())? {
        return nil
    }
    
    // initial positon of the bottom sheet
    //SheetPosition.top, SheetPosition.middle, SheetPosition.bottom
    open var initialPosition: SheetPosition{
        return .middle
    }
    
    //1 : full height, 0 : minimum height default is 1
    open var topYPercentage: CGFloat{
        return 1
    }
    
    //1 : full height, 0 : minimum height default is 0.5
    open var middleYPercentage: CGFloat{
        return 0.5
    }
    
    //1 : full height, 0 : minimum height default is 0.1
    open var bottomYPercentage: CGFloat{
        return 0.1
    }
    
    //using superview bottom inset is recommended default is 0
    open var bottomInset: CGFloat{
        return 0
    }
    
    //using safe area top inset is recommended default is 80
    open var topInset: CGFloat {
        return 80
    }
    
    
    var topY: CGFloat{
        return (1 - topYPercentage) * fullHeight + topInset - bottomInset
    }
    
    var middleY: CGFloat{
        return (1 - middleYPercentage) * fullHeight + topInset - bottomInset
    }
    
    var bottomY: CGFloat{
        return (1 - bottomYPercentage) * fullHeight + topInset - bottomInset
    }
    
    var panView: UIView!{
        return view
    }
    
    var containerView = UIView()

    var scrollViews = [UIScrollView?]()

    var pan: UIPanGestureRecognizer!
    
    var parentView: UIView!
        
    var fullHeight: CGFloat{
        return (parent?.view.frame.height ?? UIScreen.main.bounds.height) - topInset - bottomInset
    }
    
    var lastOffset: CGPoint = .zero
    var startLocation: CGPoint = .zero
    var freezeContentOffset = false
    
    //tableview variables
    var listItems: [Any] = []
    var headerItems: [Any] = []
    
    open var scrollView: UIScrollView?{
        return autoDetectedScrollView
    }
    
    var autoDetectedScrollView: UIScrollView?
    
    var didLayoutOnce = false
    
    func findScrollView(from view: UIView) -> UIView?{
        return view.ub_firstSubView(ofType: UIScrollView.self)
    }
    
    
    var topConstraint: NSLayoutConstraint?
    
    override open func viewDidLoad() {
        super.viewDidLoad()
        
//        setupGestures()
        addObserver()

    }
    
    override open func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        panView.frame = containerView.bounds
        
        if !didLayoutOnce{
            didLayoutOnce = true
            snapTo(position: self.initialPosition)
        }
    }
    
    func addObserver(){
        scrollView?.addObserver(self, forKeyPath: #keyPath(UIScrollView.contentOffset), options: [.new, .old], context: nil)
    }
    
    func setupGestures(){
        if autoDetectedScrollView == nil{
            autoDetectedScrollView = findScrollView(from: self.view) as? UIScrollView
        }
        let pan = UIPanGestureRecognizer(target: self, action: #selector(handlePan(_:)))
        self.view.addGestureRecognizer(pan)
//        self.scrollView?.panGestureRecognizer.addTarget(self, action: #selector(handleScrollPan(_:)))

        for sv in scrollViews {
            sv?.panGestureRecognizer.addTarget(self, action: #selector(handleScrollPan(_:)))
        }
    }
    
    override open func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == #keyPath(UIScrollView.contentOffset) {
            if let scroll = scrollView, scroll.contentOffset.y < 0{
                scrollView?.setContentOffset(.zero, animated: false)
            }
        }
    }
    
    public func changePosition(to position: SheetPosition){
        snapTo(position: position)
    }
    
    @objc func handlePan(_ recognizer: UIPanGestureRecognizer){
        
        switch recognizer.state {
        case .began: break
        case .changed:
            dragView(recognizer)
        default:
            snapTo(position: nextLevel(recognizer: recognizer))
        }
        
    }
    
    @objc func handleScrollPan(_ recognizer: UIPanGestureRecognizer){
        let vel = recognizer.velocity(in: self.panView)
        
        if scrollView!.contentOffset.y > 0 && vel.y >= 0{
            lastOffset = scrollView!.contentOffset
            self.startLocation = recognizer.translation(in: self.scrollView!)
            return
        }
        
        switch recognizer.state {
        case .began:
            freezeContentOffset = false
            lastOffset = scrollView!.contentOffset
            self.startLocation = recognizer.translation(in: self.scrollView!)
        case .changed:
            let dy = recognizer.translation(in: self.scrollView!).y - startLocation.y
            let f = getFrame(for: dy)
            topConstraint?.constant = f.minY

            startLocation = recognizer.translation(in: self.scrollView!)
            
            if containerView.frame.minY > topY && vel.y < 0{
                freezeContentOffset = false
                scrollView!.setContentOffset(lastOffset, animated: false)
            }else{
                lastOffset = scrollView!.contentOffset
            }
        default:
            snapTo(position: nextLevel(recognizer: recognizer))
        }
    }
    
    func dragView(_ recognizer: UIPanGestureRecognizer){
        let dy = recognizer.translation(in: self.panView).y
        //        panView.frame = getFrame(for: dy)
        topConstraint?.constant = getFrame(for: dy).minY
        
        recognizer.setTranslation(.zero, in: self.panView)
    }
    
    func getFrame(for dy: CGFloat) -> CGRect{
        let f = containerView.frame
        let minY =  min(max(topY, f.minY + dy), bottomY)
        let h = f.maxY - minY
        return CGRect(x: f.minX, y: minY, width: f.width, height: h)
    }
    
    func snapTo(position: SheetPosition){
        let f = self.containerView.frame == .zero ? self.view.frame : self.containerView.frame
        var minY = topY
        
        switch position {
        case .top:
            minY = topY
        case .middle:
            minY = middleY
        case .bottom:
            minY = bottomY
            if self.onScrollDown != nil {
                self.onScrollDown!()
            }
        }
        
        guard minY != f.minY else{return}

        
        if freezeContentOffset && scrollView!.panGestureRecognizer.state == .ended{
            scrollView!.setContentOffset(lastOffset, animated: false)
        }
        

        let h = f.maxY - minY
        let rect = CGRect(x: f.minX, y: minY, width: f.width, height: h)
        self.topConstraint?.constant = rect.minY
        
        animate(animations: {
            self.parent?.view.layoutIfNeeded()
        }, completion: nil)
    }
    
    open func animate(animations: @escaping () -> Void, completion: ((Bool) -> Void)? = nil){
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 0.7, initialSpringVelocity: 0.8, options: .curveEaseOut, animations: animations, completion: completion)
    }
    
    func nextLevel(recognizer: UIPanGestureRecognizer) -> SheetPosition{
        let y = self.containerView.frame.minY
        let velY = recognizer.velocity(in: self.view).y
        if velY < -150{
            return y > middleY ? .middle : .top
        }else if velY > 150{
            return y < (middleY + 1) ? .middle : .bottom
        }else{
            if y > middleY {
                return (y - middleY) < (bottomY - y) ? .middle : .bottom
            }else{
                return (y - topY) < (middleY - y) ? .top : .middle
            }
        }
    }
}

extension BottomSheetController: Pannable {

    public func attach(to parent: UIViewController) {
        self.view.isHidden = true
        parent.ub_add(self, in: containerView)
        parent.ub_add(self, in: containerView) { (view) in
            view.edges([.left, .right, .top, .bottom], to: parent.view, offset: .zero)
        }
        
        topConstraint = parent.view.constraints.first { (c) -> Bool in
            c.firstItem as? UIView == self.containerView && c.firstAttribute == .top
        }
        
        let bottomConstraint = parent.view.constraints.first { (c) -> Bool in
            c.firstItem as? UIView == self.containerView && c.firstAttribute == .bottom
        }
        
        bottomConstraint?.constant = -bottomInset
        self.snapTo(position: initialPosition)
        self.view.isHidden = false
    }
    
    public func detach() {
        self.ub_remove()
        self.containerView.removeFromSuperview()
    }
    
}

extension UIViewController {
    func ub_add(_ child: UIViewController, in _view: UIView? = nil, setupConstraints: ((UIView)->Void)? = nil){
        addChild(child)
        if let v = _view{
            view.addSubview(v)
            setupConstraints?(v)
            v.addSubview(child.view)
        }else{
            view.addSubview(child.view)
        }
        child.didMove(toParent: self)
    }

    func ub_remove() {
        // Just to be safe, we check that this view controller
        // is actually added to a parent before removing it.
        guard parent != nil else {
            return
        }

        willMove(toParent: nil)
        view.removeFromSuperview()
        removeFromParent()
    }
}

extension UIView {

    func ub_firstSubView<T: UIView>(ofType type: T.Type) -> T? {
        var resultView: T?
        for view in subviews {
            if let view = view as? T {
                resultView = view
                break
            }
            else {
                if let foundView = view.ub_firstSubView(ofType: T.self) {
                    resultView = foundView
                    break
                }
            }
        }
        return resultView
    }

    func edges(_ edges: UIRectEdge, to view: UIView, offset: UIEdgeInsets) {
        self.translatesAutoresizingMaskIntoConstraints = false
        if edges.contains(.top) || edges.contains(.all) {
            self.topAnchor.constraint(equalTo: view.topAnchor, constant: offset.top).isActive = true
        }

        if edges.contains(.bottom) || edges.contains(.all) {
            self.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: offset.bottom).isActive = true
        }

        if edges.contains(.left) || edges.contains(.all) {
            self.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: offset.left).isActive = true
        }

        if edges.contains(.right) || edges.contains(.all) {
            self.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: offset.right).isActive = true
        }
    }

    func roundCorners(corners: UIRectCorner, radius: CGFloat) {
         let path = UIBezierPath(roundedRect: self.bounds, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
         let mask = CAShapeLayer()
         mask.path = path.cgPath
         self.layer.mask = mask
    }
}
