import { TextField, Button, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import data from "../data/data.json";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { Box } from "@mui/system";

const assignObjectPaths = (obj, stack) => {
  Object.keys(obj).forEach((k) => {
    const node = obj[k];
    if (typeof node === "object") {
      node.path = stack ? `${stack}.${k}` : k;
      assignObjectPaths(node, node.path);
    }
  });
};

const Info = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      sectors: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      // if (!values.sectors) {
      //   errors.sectors = "Sectors is required";
      // }
      return errors;
    },
    onSubmit: (values) => {
      console.log("values:", values);
      localStorage.setItem("name", values.name);
      localStorage.setItem("sectors", JSON.stringify(values.sectors));
    },
  });

  useEffect(() => {
    const storedValue = localStorage.getItem("name");
    if (storedValue) {
      formik.setValues({ name: storedValue });
    }
    const storedSectors = localStorage.getItem("sectors");
    if (storedSectors) {
      formik.setValues(storedSectors);
    }
  }, []);

  assignObjectPaths(data);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20vh" }}>
      <Card sx={{ minWidth: "450px", padding: "24px" }}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </Typography>
          <TextField
            id="name"
            label="Name"
            name="name"
            type="text"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.name}
            sx={{ mt: 4 }}
          />
          <Typography sx={{ mt: 4 }}>Sectors</Typography>
          <DropdownTreeSelect
            data={data}
            onChange={(e) => formik.setFieldValue("sectors", e)}
            value={formik.values.sectors}
            className="mdl-demo"
            texts={{
              placeholder: "Select Sectors",
            }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 4 }}>
            Save
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Info;
