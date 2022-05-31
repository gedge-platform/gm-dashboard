import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import projectStore from "../../../../store/Project";
import workspacesStore from "../../../../store/WorkSpace";
import clusterStore from "../../../../store/Cluster";
import { dateFormatter } from "@/utils/common-utils";
import { swalConfirm, swalError } from "../../../../utils/swal-utils";
import { duplicateCheck } from "../../../../utils/common-utils";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  margin-left: 12px;
  width: 200px;
  justify-content: space-around;
  align-items: center;
`;

const ToggleBtn = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "none" : "#0f5ce9")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div`
  background-color: white;
  width: 28px;
  height: 28px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(60px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

const CreateProject = observer((props) => {
  const { open } = props;
  const { clusters, setClusters, loadClusterInWorkspace } = clusterStore;
  const { workSpaceList, loadWorkSpaceList } = workspacesStore;
  const { createProject } = projectStore;

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [selectCluster, setSelectCluster] = useState([]);
  const [check, setCheck] = useState(false);

  const [toggle, setToggle] = useState(false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setProjectName("");
    setProjectDescription("");
    setWorkspace("");
    setSelectCluster([]);
    setClusters([]);
    setToggle(false);
    setCheck(false);
  };

  const onChange = ({ target: { name, value } }) => {
    if (name === "workspace") {
      if (value === "") {
        setClusters([]);
        return;
      }
      loadClusterInWorkspace(value);
      setSelectCluster([]);
      setWorkspace(value);
    } else if (name === "projectName") {
      setProjectName(value);
    } else if (name === "projectDescription") {
      setProjectDescription(value);
    }
  };

  const checkCluster = ({ target: { checked } }, clusterName) => {
    if (checked) {
      setSelectCluster([...selectCluster, clusterName]);
    } else {
      setSelectCluster(
        selectCluster.filter((cluster) => cluster !== clusterName)
      );
    }
  };

  const checkProjectName = async () => {
    const regType1 = /^[a-z0-9]([-a-z0-9]*[a-z0-9])*$/;
    if (!regType1.test(projectName)) {
      swalError("사용할 수 없는 문자열이 포함되어 있습니다.");
      setCheck(false);
      return;
    }
    const result = await duplicateCheck(projectName, "project");

    if (result) {
      swalError("사용 가능한 이름입니다.");
      setCheck(true);
    } else {
      swalError("사용할 수 없는 이름입니다.");
      setProjectName("");
      setCheck(false);
    }
  };

  const postProject = () => {
    if (!check) {
      swalError("프로젝트 이름을 확인해주세요!");
      return;
    }
    if (workspace === "") {
      swalError("워크스페이스를 확인해주세요!");
      return;
    }
    if (selectCluster.length === 0) {
      swalError("클러스터를 확인해주세요!");
      return;
    }
    createProject(
      projectName,
      projectDescription,
      props.type,
      workspace,
      selectCluster,
      toggle,
      handleClose
    );
  };

  useEffect(() => {
    loadWorkSpaceList();
  }, []);

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Project`}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th style={{ width: "20%" }}>
              Project Name
              <span className="requried">*</span>
            </th>
            <td style={{ display: "flex" }}>
              <CTextField
                type="text"
                placeholder="Project Name"
                style={{ flex: 3 }}
                name="projectName"
                onChange={onChange}
                value={projectName}
              />
              <ButtonNext onClick={checkProjectName} style={{ height: "32px" }}>
                중복확인
              </ButtonNext>
            </td>
          </tr>
          <tr>
            <th>Project Description</th>
            <td>
              <CTextField
                type="text"
                placeholder="Project Description"
                className="form_fullWidth"
                name="projectDescription"
                onChange={onChange}
                value={projectDescription}
              />
            </td>
          </tr>
          <tr>
            <th>
              Project Type
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                disabled={true}
                className="form_fullWidth"
                name="projectType"
                value={props.type}
              />
            </td>
          </tr>
          <tr>
            <th>Istio Check</th>
            <td>
              <ToggleWrapper>
                <span>Disalbe</span>
                <ToggleBtn onClick={clickedToggle} toggle={toggle}>
                  <Circle toggle={toggle} />
                </ToggleBtn>
                <span>Enable</span>
              </ToggleWrapper>
            </td>
          </tr>
          <tr>
            <th>
              Workspace
              <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="workspace" onChange={onChange}>
                  <option value={" "}>Select Workspace</option>
                  {workSpaceList.map((workspace) => (
                    <option value={workspace.workspaceName}>
                      {workspace.workspaceName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <th>
              Cluster <span className="requried">*</span>
            </th>
            <td>
              <table className="tb_data_new">
                <tbody className="tb_data_nodeInfo">
                  <tr>
                    <th></th>
                    <th>이름</th>
                    <th>타입</th>
                    <th>생성자</th>
                    <th>노드개수</th>
                    <th>IP</th>
                    <th>생성날짜</th>
                  </tr>
                  {clusters.map(
                    ({
                      clusterName,
                      clusterType,
                      clusterEndpoint,
                      nodeCnt,
                      clusterCreator,
                      created_at,
                    }) => (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            name="clusterCheck"
                            onChange={(e) => checkCluster(e, clusterName)}
                          />
                        </td>
                        <td>{clusterName}</td>
                        <td>{clusterType}</td>
                        <td>{clusterCreator}</td>
                        <td>{nodeCnt}</td>
                        <td>{clusterEndpoint}</td>
                        <td>{dateFormatter(created_at)}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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
          <ButtonNext onClick={postProject}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});
export default CreateProject;
