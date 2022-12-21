import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
const styles = dynamic(() => import('../../pages/home.module.scss'))

import { Container, Row, Col } from "reactstrap";
import { Card, Button } from "reactstrap";
const BottomFooter = dynamic(()=> import('./BottomFooter/BottomFooter'))
import { getContactPage } from "../../redux/Contact_us/action";
import { getContactDetailsPage } from "../../redux/Contact_details/action";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "reactstrap";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [reqFields, setreqFields] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const cms = useSelector((state) => state.contact);
  const details = useSelector((state) => state.contactDetails);

  const { contact_us_page } = cms;
  const { contact_details_page } = details;

  const det = contact_details_page && contact_details_page.contactDetails[0];

  const submitHandler = (e) => {
    e.preventDefault();
    setreqFields(false)

    if (!email || !phoneNumber || !message) {
      setreqFields(true)

    } else {
      dispatch(getContactPage(email, phoneNumber, message));

    }
  };
  useEffect(() => {
    dispatch(getContactDetailsPage());
  }, []);

  return (
    <div className="main_section_bg">
      <Container className={`${styles.main_container_footer} mb-5 p-0`}>
        <div className="contact_heding">
          <h3>Contact Us</h3>
        </div>
        <Row>
          <Col xs={12} md={6} className="info_boxes_main contact ">
            <div className="main_infos">
              <div className="row">
                <div className="contact_div col-md-6">
                  <div className="info-box">
                    <i className="fa fa-phone"></i>
                    <h3>Call Us</h3>
                    <a href={`tel:+1${det && det.phoneNumber}`}> <i className="fa fa-volume-control-phone custom_size_icon" style=
                      {{ transform: 'rotate(-40deg)' }}></i> +1{det && det.phoneNumber}</a><br />
                    <a href={`https://wa.me/1${det && det.whatsapp}`}> <i className="fa fa-whatsapp custom_size_icon"></i> +1{det && det.whatsapp}</a><br />
                    <a href={`skype:+1${det && det.skype}-?chat`}> <i className="fa fa-skype custom_size_icon"></i> +1{det && det.skype}</a><br />
                  </div>
                </div>
                <div className="contact_div col-md-6">
                  <div className="info-box">
                    <i className="fa fa-map-marker"></i>
                    <h3>Location</h3>
                    <p>8222 Kingsbrook Rd, <br /> Houston, TX 77024</p>
                  </div>
                </div>
                <div className="contact_div col-md-6">
                  <div className="info-box">
                    <i className="fa fa-envelope-o"></i>
                    <h3>Email Us</h3>
                    <a href={`mailto:${det && det.email}`}>{det && det.email}</a>
                  </div>
                </div>
                <div className="contact_div col-md-6">
                  <div className="info-box">
                    <i className="fa fa-clock-o"></i>
                    <h3>Open Hours</h3>
                    <p>Monday - Friday<br />9:00AM - 05:00PM</p>
                  </div>
                </div>
              </div>
            </div>
            {/* {details.error && (
              <Alert className="m-0" color="danger">
                {details.error}
              </Alert>
            )}
            <div className={styles.container_right}>
              <div className={styles.overly}>
                <img
                  src="/Assets/logo-white.svg"
                  className="img img-fluid mb-3"
                  className={styles.upLogo}
                />
                <h2>Our Contact Details</h2>
                <div className={styles.details_container}>
                  <img src="/Assets/location.svg" className="img img-fluid" />
                  <h6>Location</h6>
                  <p>{det && det.location}</p>
                </div>
                <div className={styles.details_container}>
                  <div className={styles.inner_container}>
                    <div className={styles.details_container}>
                      <a href={`tel:+1${det && det.phoneNumber}`}>
                        <img
                          src="/Assets/phone.svg"
                          className={`${styles.phone} img img-fluid`}
                        />
                        <h6>Phone</h6>
                        <p>+1{det && det.phoneNumber}</p>
                      </a>
                    </div>
                    <div className={styles.details_container}>
                      <a href={`https://wa.me/1${det && det.whatsapp}`}>
                        <img
                          src="/Assets/whatsapp.svg"
                          className={`${styles.phone} img img-fluid`}
                        />
                        <h6>Whatsapp</h6>
                        <p>+1{det && det.whatsapp}</p>
                      </a>
                    </div>
                    <div className={styles.details_container}>
                      <a href={`skype:+1${det && det.skype}-?chat`}>
                        <img
                          src="/Assets/skype.svg"
                          className={`${styles.phone} img img-fluid`}
                        />
                        <h6>Skype</h6>
                        <p>+1{det && det.skype}</p>
                      </a>
                    </div>
                  </div>
                </div>

                <div className={styles.details_container}>
                <a href={`mailto:${det && det.email}`}>
                  <img src="/Assets/email.svg" className="img img-fluid" width="25px" />
                  <h6>Support</h6>
                  <p>{det && det.email}</p>
                  </a>
                </div>
              </div>
            </div> */}
          </Col>
          <Col style={{margin: "auto"}} xs={11} md={6} className="add_overflow">
            <div className="custom_contactus">
              {cms.error && (
                <Alert className="m-0" color="danger">
                  {cms.error}
                </Alert>
              )}
              <Row style={{ marginTop: "15px" }}>
                <Col xs="12">
                  {reqFields ? (
                    <Alert
                      style={{ borderRadius: "0.5rem" }}
                      color="danger"
                    >
                      All Fields Are Required
                    </Alert>
                  ) : ""}
                </Col>
              </Row>
              <Card className={`${styles.cardPayment}`}>

                <div className="form-group icon">
                  <label
                    for="exampleInputPassword1"
                    className={styles.label}
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="@"
                    className={`${styles.input} bg-light inside form-control`}
                  />
                </div>

                <div className="form-group">
                  <label className={styles.label} for="exampleInputEmail1">
                    Phone
                  </label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="number"
                    placeholder="+1"
                    className={`${styles.input} form-control inside bg-light`}
                  />
                </div>
                <div className="form-group">
                  <label className={styles.label} for="exampleInputEmail1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${styles.input} form-control inside bg-light`}
                    placeholder="type a message..."
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>

                <Row>
                  <Col xs="12">
                    <Button
                      onClick={submitHandler}
                      className={styles.buttonPayment}
                    >
                      Send
                    </Button>
                  </Col>
                </Row>
                <Row style={{ marginTop: "15px" }}>
                  <Col xs="12">
                    {contact_us_page && (
                      <Alert
                        style={{ borderRadius: "0.5rem" }}
                        color="success"
                      >
                        {contact_us_page.status}
                      </Alert>
                    )}
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>

        </Row>
      </Container>
      <BottomFooter />
    </div>
  );
};

export default Footer;
