import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import {
  claimStore,
  deploymentStore,
  projectStore,
  StorageClassStore,
  workspaceStore,
  volumeStore,
} from "@/store";

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

const ClaimBasicInformation = observer((props) => {
  const {
    loadWorkSpaceList,
    workSpaceList,
    loadWorkspaceDetail,
    projectList,
    viewList,
  } = workspaceStore;

  const [projectEnable, setProjectEnable] = useState(true);
  const [clusterEnable, setClusterEnable] = useState(true);
  const [storageClassEnable, setStorageClassEnable] = useState(true);
  const { selectClusterInfo, setSelectClusterInfo, loadProjectDetail } =
    projectStore;
  const { setWorkspace } = deploymentStore;

  // const {setSelectClusters} = volumeStore;

  const {
    setVolumeName,
    setClaimName,
    setAccessMode,
    setVolumeCapacity,
    volumeCapacity,
    volumeName,
    claimName,
    setProject,
    selectClusters,
    setSelectClusters,
  } = claimStore;

  const {
    setSelectStorageClass,
    loadStorageClassName,
    setStorageClass,
    storageClassNameData,
  } = StorageClassStore;

  const onChange = async (e) => {
    const { value, name } = e.target;
    if (name === "claimName") {
      setClaimName(value);
    } else if (name === "workspace") {
      console.log();
      setSelectClusterInfo([]);
      loadWorkspaceDetail(value);
      setWorkspace(value);
      // setProject("");
      setProjectEnable(false);
      return;
    } else if (name === "project") {
      if (value === "") {
        setSelectClusterInfo([]);
        return;
      }
      await loadProjectDetail(value);
      setSelectClusters([...selectClusterInfo]);
      setProject(value);
      setClusterEnable(false);
      setStorageClassEnable(false);
      return;
    } else if (name === "selectClusters") {
      setSelectClusters(value);
      return;
    } else if (name === "selectStorageClass") {
      setSelectStorageClass(value);
      return;
    } else if (name === "accessMode") {
      setAccessMode(value);
      return;
    } else if (name === "volumeCapacity") {
      setVolumeCapacity(value);
      return;
    }
  };

  const checkCluster = ({ target: { checked } }, clusterName) => {
    if (checked) {
      setSelectClusters(clusterName);
      loadStorageClassName(clusterName);
    }
  };

  useEffect(() => {
    loadWorkSpaceList(true);
    setSelectClusterInfo([]);
  }, []);

  useEffect(() => {
    setSelectClusters([...selectClusterInfo]);
  }, []);

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step current">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>설정 검토</span>
          </div>
        </div>
      </div>
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              VolumeClaim Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Volume Claim Name"
                className="form_fullWidth"
                name="claimName"
                onChange={onChange}
                value={claimName}
              />
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Workspace <span className="requried">*</span>
            </th>
            <td style={{ width: "50%" }}>
              <FormControl className="form_fullWidth">
                <select name="workspace" onChange={onChange}>
                  <option value={""}>Select Workspace</option>
                  {viewList.map((item) => (
                    <option value={item.workspaceName}>
                      {item.workspaceName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Project <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                {projectList !== 0 ? (
                  <select
                    disabled={projectEnable}
                    name="project"
                    onChange={onChange}
                  >
                    <option value={""}>Select Project</option>
                    {projectList.map((project) => (
                      <option value={project.projectName}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div>&nbsp;&nbsp; Project does not exist. </div>
                )}
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Cluster <span className="requried">*</span>
            </th>
            <td>
              <table className="tb_data_new">
                {projectList !== 0 ? (
                  <tbody className="tb_data_nodeInfo">
                    <tr>
                      <th></th>
                      <th>이름</th>
                      <th>타입</th>
                      <th>IP</th>
                    </tr>
                    {selectClusterInfo.map(
                      ({ clusterName, clusterType, clusterEndpoint }) => (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              name="selectClusters"
                              onChange={(e) => checkCluster(e, clusterName)}
                            />
                          </td>
                          <td>{clusterName}</td>
                          <td>{clusterType}</td>
                          <td>{clusterEndpoint}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                ) : (
                  <tbody className="tb_data_nodeInfo">
                    <tr>
                      <th></th>
                      <th>이름</th>
                      <th>타입</th>
                      <th>IP</th>
                    </tr>
                  </tbody>
                )}
              </table>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              StorageClass <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                {projectList !== 0 ? (
                  <select
                    disabled={storageClassEnable}
                    name="selectStorageClass"
                    onChange={onChange}
                  >
                    <option value={""}>Select StorageClass</option>
                    {storageClassNameData
                      ? storageClassNameData.map((storageClass) => (
                          <option value={storageClass.name}>
                            {storageClass.name}
                          </option>
                        ))
                      : ""}
                  </select>
                ) : (
                  <div>&nbsp;&nbsp; StorageClass does not exist. </div>
                )}
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Access Mode <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="accessMode" onChange={onChange}>
                  <option value="Select Access Mode">Select Access Mode</option>
                  <option value="ReadWriteOnce">ReadWriteOnce</option>
                  <option value="ReadOnlyMany">ReadOnlyMany</option>
                  <option value="ReadWriteMany">ReadWriteMany</option>
                  <option value="ReadWriteOncePod">ReadWriteOncePod</option>
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Volume Capacity
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="number"
                placeholder="Volume Capacity"
                className="form_fullWidth"
                name="volumeCapacity"
                onChange={onChange}
                value={volumeCapacity || ""}
              />
            </td>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default ClaimBasicInformation;
