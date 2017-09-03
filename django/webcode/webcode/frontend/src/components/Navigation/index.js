import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router-dom';


class Navigation extends Component {

    componentDidMount() {
      const { menu } = this.refs;
      $(menu).metisMenu();
    }

    activeRoute(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
      return (
        <nav className="navbar-default navbar-static-side" role="navigation">
          <ul className="nav metismenu" id="side-menu" ref="menu">
            <li className="nav-header">
              <div className="dropdown profile-element"> <span></span>
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="clear">
                    <span className="block m-t-xs"> <strong className="font-bold">Example user</strong></span>
                    <span className="text-muted text-xs block">Example position<b className="caret"></b></span>
                  </span>
                </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                  <li><a href="#"> Logout</a></li>
                </ul>
              </div>
              <div className="logo-element">
                IN+
              </div>
            </li>
            <li className={this.activeRoute("/home")}>
              <Link to="/home"><i className="pe-7s-home" style={{color: 'white'}}></i> <span className="nav-label">Home</span></Link>
            </li>
            <li className={this.activeRoute("/about")}>
              <Link to="/about"><i className="pe-7s-info" style={{color: 'white'}}></i> <span className="nav-label">About</span></Link>
            </li>
            <li className={this.activeRoute("/data")}>
              <Link to="/data"><i className="pe-7s-server" style={{color: 'white'}}></i> <span className="nav-label">Data</span></Link>
            </li>
            <li className={this.activeRoute("/people")}>
              <Link to="/people"><i className="pe-7s-users" style={{color: 'white'}}></i> <span className="nav-label">People</span></Link>
            </li>
            <li className={this.activeRoute("/organizations")}>
              <Link to="/organizations"><i className="pe-7s-culture" style={{color: 'white'}}></i> <span className="nav-label">Organizations</span></Link>
            </li>
            <li className={this.activeRoute("/news")}>
              <Link to="/news"><i className="pe-7s-news-paper" style={{color: 'white'}}></i> <span className="nav-label">News</span></Link>
            </li>
          </ul>
        </nav>
      )
    }
}

export default Navigation;
