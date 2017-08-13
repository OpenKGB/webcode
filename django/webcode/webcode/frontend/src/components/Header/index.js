import React from 'react';
import { Dropdown } from 'react-bootstrap';

class Header extends React.Component {

    smoothlyMenu() {
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            $('#side-menu').hide(); // Hide menu in order to smoothly turn on when maximize menu
            setTimeout(function () { $('#side-menu').fadeIn(400); }, 200); // For smoothly turn on menu
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(function () { $('#side-menu').fadeIn(400); }, 100);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    }

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        this.smoothlyMenu();
    }

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation.bind(this)} href="#"><i className="fa fa-bars"></i> </a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <a href="#">
                                <i className="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header;
