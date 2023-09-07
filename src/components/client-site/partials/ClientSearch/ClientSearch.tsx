import { notification } from "antd";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ClientSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    } else {
      notification.warning({
        message: "Please fill information",
      });
    }
  };

  return (
    <>s
      <div>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Button variant="outline-success" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ClientSearch;
