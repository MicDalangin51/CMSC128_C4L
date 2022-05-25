import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DashboardLayout } from "/src/components";
import { FaArrowLeft, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import {
  Accordion,
  Table,
  Image,
  Row,
  Col,
  Button,
  Card,
  Container,
  Modal,
  Form,
  FloatingLabel,
  Dropdown,
} from "react-bootstrap";
import casBuilding from "/src/images/cas-building.png";

const StudentRecord = () => {
  const { studentNumber } = useParams();

  //for editing student-data row
  const [show, setShow] = useState(false);
  const [edit_course, setCourseEdit] = useState("");
  const [edit_grade, setGradeEdit] = useState("");
  const [edit_units, setUnitsEdit] = useState("");
  const [edit_weight, setWeightEdit] = useState("");
  const [edit_cumulative, setCumulativeEdit] = useState("");

  const handleShow = (course_number, grade, units, weight, cumulative) => {
    setShow(true);
    setCourseEdit(course_number);
    setGradeEdit(grade);
    setUnitsEdit(units);
    setWeightEdit(weight);
    setCumulativeEdit(cumulative);
  };

  const handleClose = () => {
    setShow(false);
    const row = {
      student_number: studentNumber,
      course_number: edit_course,
      grade: edit_grade,
      units: edit_units,
      weight: edit_weight,
      cumulative: edit_cumulative,
    };

    fetch(`api/students/${studentNumber}/courses/${edit_course}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          alert("Successfully edited!");
        } else {
          alert("Failed to edit!");
        }
      });
  };

  //for adding student-data row
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
    setCourseEdit("");
    setGradeEdit("");
    setUnitsEdit("");
    setWeightEdit("");
    setCumulativeEdit("");
  };
  const handleCloseAdd = (semester) => {
    setShowAdd(false);
    const row = {
      student_number: studentNumber,
      course_number: edit_course,
      grade: edit_grade,
      units: edit_units,
      weight: edit_weight,
      cumulative: edit_cumulative,
      semester: semester,
    };

    fetch(`api/students/${studentNumber}/courses/${edit_course}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          alert("Successfully added!");
        } else {
          alert("Failed to add!");
        }
      });
  };

  //gets the student's data
  const [student, setStudent] = useState([]);

  useEffect(async () => {
    console.log("test");
    const response = await fetch(`/api/students/${studentNumber}`);
    const data = await response.json();
    setStudent(data.student);
    console.log("student", student);
  }, []);

  //deletes a row of student-data
  function deleteRow(studentNumber, course_number, semester) {
    const row = {
      studentNumber: studentNumber,
      course_number: course_number,
      semester: semester,
    };

    fetch(`api/students/${studentNumber}/courses/${course_number}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          alert("Successfully deleted!");
        } else {
          alert("Failed to delete!");
        }
      });
  }

  //changing the status of the student to verified and unverified
  const [showStatus, setShowStatus] = useState(false);

  const handleShowStatus = () => setShowStatus(true);
  const handleCloseStatus = () => setShowStatus(false);

  function changeStatus() {
    setShowStatus(false);
    if (student.status == "verified") {
      student.status = "unverified";
    } else {
      student.status = "verified";
    }

    fetch("api/change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          alert("Successfully changed!");
        } else {
          alert("Failed to change!");
        }
      });
  }

  return (
    <DashboardLayout fixedContent>
      <Modal size="lg" show={showAdd} centered>
        <Modal.Body>
          <Row className="pb-2">
            <FloatingLabel controlId="floatingInputGrid" label="Course">
              <Form.Control defaultValue={edit_course} />
            </FloatingLabel>
          </Row>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Grade">
                <Form.Control defaultValue={edit_grade} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Units">
                <Form.Control defaultValue={edit_units} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Weight">
                <Form.Control defaultValue={edit_weight} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Cumulative">
                <Form.Control defaultValue={edit_cumulative} />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={show} centered>
        <Modal.Body>
          <Row className="pb-2">
            <FloatingLabel controlId="floatingInputGrid" label="Course">
              <Form.Control defaultValue={edit_course} />
            </FloatingLabel>
          </Row>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Grade">
                <Form.Control defaultValue={edit_grade} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Units">
                <Form.Control defaultValue={edit_units} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Weight">
                <Form.Control defaultValue={edit_weight} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Cumulative">
                <Form.Control defaultValue={edit_cumulative} />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showStatus} centered>
        <Modal.Body>Change verification?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={changeStatus}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseStatus}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="overflow-auto">
        <Row xs="auto" className="m-3">
          <Col>
            <a href="/">
              <Button className="btn btn-primary bg-transparent border-0">
                <FaArrowLeft color="maroon" />
              </Button>
            </a>
          </Col>
          <Col className="flex-fill">
            <Row xs="auto" className="m-3">
              <Col>
                <Image
                  src={casBuilding}
                  width="150"
                  height="150"
                  className="me-2"
                  roundedCircle
                />
              </Col>
              <Col className="my-auto">
                <h1>{student.name}</h1>
                <div className="text-black">{student.student_number}</div>
                <div className="text-black">{student.course}</div>
              </Col>
              <Col className="my-auto">
                <Button onClick={handleShowStatus}>
                  {student.status == "verified" && (
                    <Badge pill bg="success">
                      {student.status}
                    </Badge>
                  )}
                  {student.status == "unverified" && (
                    <Badge pill bg="secondary">
                      {student.status}
                    </Badge>
                  )}
                  {student.status == "pending" && (
                    <Badge pill bg="secondary">
                      {student.status}
                    </Badge>
                  )}
                </Button>
              </Col>
            </Row>
            <Row></Row>

            <Row>
              <Accordion defaultActiveKey="0" alwaysOpen>
                {student.summary?.map((entry, index) => (
                  <Accordion.Item eventKey={"" + index + ""}>
                    <Accordion.Header>{entry.semester}</Accordion.Header>
                    <Accordion.Body>
                      <Table hover responsive>
                        <thead>
                          <tr className="text-secondary">
                            <th>Course Number</th>
                            <th>Grade</th>
                            <th>Units</th>
                            <th>Weight</th>
                            <th>Cumulative</th>
                            <th>
                              <Button
                                onClick={() => {
                                  handleShowAdd(entry.semester);
                                }}
                                variant="outline-none"
                                size="sm"
                              >
                                <FaPlus />
                              </Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {entry.content.map(
                            (
                              {
                                course_number,
                                grade,
                                units,
                                weight,
                                cumulative,
                              },
                              index
                            ) => {
                              return (
                                <tr key={index}>
                                  <td>{course_number}</td>
                                  <td>{grade}</td>
                                  <td>{units}</td>
                                  <td>{weight}</td>
                                  <td>{cumulative}</td>

                                  <Button
                                    variant="outline-none"
                                    size="sm"
                                    onClick={() =>
                                      deleteRow(
                                        entry.studentNumber,
                                        course_number,
                                        entry.semester
                                      )
                                    }
                                  >
                                    <FaMinus />
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleShow(
                                        course_number,
                                        grade,
                                        units,
                                        weight,
                                        cumulative
                                      )
                                    }
                                    variant="outline-none"
                                    size="sm"
                                  >
                                    <FaEdit />
                                  </Button>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Row>
          </Col>

          <Col className="flex-fill m-5">
            <Row className="my-5 py-3"></Row>
            <Row className="my-5">
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <h6>GWA</h6>
                      <Card.Text className="text-black">
                        {student.GWA}
                      </Card.Text>
                    </Col>
                    <Col>
                      <h6>Total Units</h6>
                      <Card.Text className="text-black">
                        {student.total_units}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            {/* <Row>
            <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <h6>Required Units</h6>
                      <Card.Text className="text-black">
                        {entries.req_units}
                      </Card.Text>
                    </Col>
                    <Col>
                      <h6>Total Units</h6>
                      <Card.Text className="text-black">
                        {entries.total_units}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row> */}
            <Row>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h6>General Errors</h6>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default StudentRecord;
