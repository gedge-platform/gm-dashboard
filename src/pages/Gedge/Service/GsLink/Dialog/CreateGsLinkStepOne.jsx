import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { CDialogNew } from "@/components/dialogs";
import { swalError } from "../../../../../utils/swal-utils";
import { FormControl, Table } from "@material-ui/core";
import { useEffect, useState } from "react";
import gsLinkStore from "../../../../../store/GsLink";
import workspaceStore from "../../../../../store/WorkSpace";
import projectStore from "../../../../../store/Project";
import clusterStore from "../../../../../store/Cluster";
import podStore from "../../../../../store/Pod";
import serviceStore from "../../../../../store/Service";

const CreateGsLinkStepOne = observer((props) => {
  const { open } = props;

  const {
    loadWorkSpaceList,
    workSpaceList,
    loadSourceCluster,
    sourceClusterList,
  } = workspaceStore;
  const { projectListinWorkspace, loadProjectListInWorkspace, projectLists } =
    projectStore;
  const { gsLinkInfo, setGsLinkInfo, parameters, setParameters } = gsLinkStore;
  const { loadPodList, podList } = podStore;
  const { loadServiceList, serviceList } = serviceStore;

  const [selectedService, setSelectedService] = useState([]);
  const [selectedPod, setSelectedPod] = useState([]);
  console.log("sourceClusterList ??? ", sourceClusterList);

  useEffect(() => {
    loadPodList();
  }, []);

  useEffect(() => {
    loadServiceList();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log("name ? ", name);
    console.log("value ? ", value);

    if (name === "workspace") {
      setGsLinkInfo("workspace_name", value);
      loadProjectListInWorkspace(value);
      loadSourceCluster(value);
    }

    if (name === "sourceCluster") {
      //   const clusterListTemp = podList?.filter((data) => data.cluster === value);

      //   console.log("clusterListTemp ??? ", clusterListTemp);
      //   setSelectedPod(clusterListTemp);

      const serviceListTemp = serviceList?.filter(
        (data) => data.cluster === value
      );
      setSelectedService(serviceListTemp);

      setParameters("source_cluster", value);
    }

    if (name === "service") {
      setParameters("source_service", value);
    }

    if (name === "targetCluster") {
      setParameters("target_cluster", value);
    }
  };

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step current">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>소스 클러스터</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>대상 클러스터</span>
          </div>
        </div>
      </div>

      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Workspace <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="workspace"
                  onChange={onChange}
                  value={gsLinkInfo.workspace_name}
                >
                  <option value={""} disabled hidden>
                    Select Workspace
                  </option>
                  {workSpaceList?.map((workspace) => (
                    <option
                      key={workspace.workspaceUUID}
                      value={workspace.workspaceName}
                    >
                      {workspace.workspaceName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <th>
              Source Cluster <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="sourceCluster"
                  onChange={onChange}
                  value={parameters.source_cluster}
                >
                  <option value={""} disabled hidden>
                    Select source Cluster
                  </option>
                  {sourceClusterList?.map((scluster) => (
                    <option
                      key={scluster.clusterName}
                      value={scluster.clusterName}
                    >
                      {scluster.clusterName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>

          {/* <tr>
            <th>
              Pod <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="service"
                  onChange={onChange}
                  value={parameters.source_service}
                >
                  <option value={""} disabled hidden>
                    Select Pod
                  </option>
                  {selectedPod?.map((pod) => (
                    <option key={pod.name} value={pod.name}>
                      {pod.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr> */}

          <tr>
            <th>
              Service <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="service"
                  onChange={onChange}
                  value={parameters.source_service}
                >
                  <option value={""} disabled hidden>
                    Select Service
                  </option>
                  {selectedService?.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <th>
              Target Cluster <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="targetCluster"
                  onChange={onChange}
                  value={parameters.target_cluster}
                >
                  <option value={""} disabled hidden>
                    Select source Cluster
                  </option>
                  {sourceClusterList?.map((tcluster) => (
                    <option
                      key={tcluster.clusterName}
                      value={tcluster.clusterName}
                    >
                      {tcluster.clusterName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default CreateGsLinkStepOne;
