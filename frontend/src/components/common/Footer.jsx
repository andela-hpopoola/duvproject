import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Link } from '@reach/router';
import RedLogo from 'assets/img/logo/red-white.svg';

const Footer = ({ className }) => (
  <footer className={`footer ${className}`}>
    <div className="container-fluid">
      <div className="footer__content">
        <Row>
          <Col sm={2} xs={6}>
            <Link to="/">
              <img alt="Duv Live White Logo" height="75" src={RedLogo} />
            </Link>
          </Col>
          <Col sm={2} xs={6}>
            <ul className="list-unstyled footer__links">
              <li className="footer__header">Company</li>
              <li>
                <Link to="/how-it-works">How it works</Link>
              </li>
              <li>
                <Link to="/how-it-works">About</Link>
              </li>
              <li>
                <Link to="/help">BrainBox</Link>
              </li>
            </ul>
          </Col>
          <Col sm={2} xs={6}>
            <ul className="list-unstyled footer__links">
              <li className="footer__header">Communities</li>
              <li>
                <Link to="/hire-entertainers#DJs">DJs</Link>
              </li>
              <li>
                <Link to="/hire-entertainers#MCs">MCs</Link>
              </li>
              <li>
                <Link to="/hire-entertainers#Live-Bands">Live Bands</Link>
              </li>
            </ul>
          </Col>
          <Col sm={2} xs={6}>
            <ul className="list-unstyled footer__links">
              <li className="footer__header">Useful Links</li>
              <li>
                {' '}
                <Link to="/help">FAQs</Link>
              </li>
              <li>
                {' '}
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </Col>
          <Col sm={4}>
            <ul className="list-unstyled list-inline footer__icons">
              {getSocialMediaIcons()}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
    <div className="footer__bottom">
      <div className="container-fluid">
        <Row>
          <Col className="d-none d-sm-block" sm={6}>
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link to="/terms-of-use">Terms of Use</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/help">Help</Link>
              </li>
            </ul>
          </Col>
          <Col sm={6} xs={12}>
            <p className="footer__bottom--copyright">
              &copy; 2019 <strong className="text-danger">DUV LIVE</strong>. All
              Rights Reserved.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  </footer>
);

const getSocialMediaIcons = () => {
  const links = [
    { name: 'facebook', link: 'http://www.facebook.com' },
    { name: 'twitter', link: 'http://www.twitter.com' },
    { name: 'linkedin', link: 'http://www.linkedin.com' },
    { name: 'youtube', link: 'http://www.youtube.com' },
    { name: 'instagram', link: 'http://www.instagram.com' }
  ];
  return links.map(({ name, link }) => (
    <li key={name}>
      <a href={link} rel="noopener noreferrer" target="_blank" title={name}>
        <i className={`icon icon-${name}`} />
      </a>
    </li>
  ));
};

Footer.propTypes = {
  className: PropTypes.string
};
Footer.defaultProps = {
  className: ''
};

export default Footer;
