import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { FormControl } from "@material-ui/core";
import FaasStore from "../../../../../store/Faas";
import { useEffect, useState } from "react";
import { swalError } from "../../../../../utils/swal-utils";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const PutPoolSize = observer((props) => {
  const { open } = props;
  const { envDetail, setPoolSize, putEnvAPI, poolSize } = FaasStore;

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "poolSize") {
      setPoolSize(value);
    }
  };

  const putPoolSize = () => {
    putEnvAPI(envDetail.env_name, poolSize);
    swalError("Pool Size가 수정되었습니다.");
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Put Pool Size`}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>Environment Name</th>
            <td style={{ width: "50%" }}>
              <CTextField
                type="text"
                className="form-fullWidth"
                name="envName"
                value={envDetail.env_name}
                style={{ width: "100%" }}
              />
            </td>
          </tr>

          <tr>
            <th>
              Pool Size <span className="requried">*</span>
            </th>
            <td style={{ width: "50%" }}>
              <CTextField
                type="text"
                className="form-fullWidth"
                name="poolSize"
                value={envDetail?.fission_spec?.poolsize}
                onChange={onChange}
                style={{ width: "100%" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "240px",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleClose}>취소</Button>
          <ButtonNext onClick={putPoolSize}>수정</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});

export default PutPoolSize;
