import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Testimonial from '../pages/testimonial';
import Login from '../pages/login';
import { createBrowserHistory } from "history";

export default function Routes() {
  //const session = localStorage.getItem('ShadeUser') || ''
  const session='abcd';
  const history = createBrowserHistory();
  
  return session != '' ? (
    <HashRouter history={history}>
    
      <Route path="/testimonial" component={Testimonial} />
    </HashRouter>
  ) : (
    <HashRouter>
      <Route path="/" render={(props) => <Login  {...props}/>}/>
    </HashRouter>
  )
}

/*}
    <SessionContext.Provider value={session}>
    <HashRouter>
      {//session &&
        <Route path="/login" exact render={(props) => <Login {...props}/>}/>
  //    }{session.id &&
        <Route path="/roughInvoiceCreate/:id_rough_invoice" component={RoughInvoiceCreate} />
      }{session.id  &&
        <Route path="/invoice/:id/:id_rough_invoice?" component={Invoice} />
      }{session.id  &&
        <Route path="/invoiceList" component={InvoiceList} />
      }{session.id  &&
        <Route path="/roughInvoiceList" component={RoughInvoiceList} />
      }{session.id  &&
        <Route path="/" exact component={InvoiceList} />
      }{session.id  &&
        <Route path="/voucher" exact component={Voucher} />
      }{session.id  &&
        <Route path="/payroll" exact component={Payroll} />
      }{session.id  &&
        <Route path="/ledgerReport" exact component={LedgerReport} />
      }{session.id  &&
        <Route path="/ledger" exact component={Ledger} />
      }{session.id  &&
        <Route path="/ledgerCreate/:id_ledger" exact component={LedgerCreate} />
      }{session.id  &&
        <Route path="/ledgerGroup" exact component={LedgerGroup} />
      }{session.id  &&
        <Route path="/cashBook" exact component={CashBook} />
      }{session.id  &&
        <Route path="/product" exact component={Product} />
      }{session.id  &&
        <Route path="/purchaseVoucher/:voucher_no" exact component={PurchaseVoucher} />
      }{session.id  &&
        <Route path="/purchaseReport" exact component={PurchaseReport} />
      }{session.id  &&
        <Route path="/stockReport" exact component={StockReport} />
      }{session.id  &&
        <Route path="/sundryCreditor" exact component={SundryCreditor} />
      }{session.id  &&
        <Route path="/sundryDebtor" exact component={SundryDebtor} />   
      }{session.id  &&
        <Route path="/notification" exact component={Notification} />   
      }{session.id  &&
        <Route path="/notificationCreate" exact component={NotificationCreate} /> 
      }{session.id  &&
        <Route path="/users" exact component={Users} />
      }{session.id  &&
        <Route path="/userCreate/:id_user" exact component={UserCreate} />
      }
    </HashRouter>
    </SessionContext.Provider>
    */