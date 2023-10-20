import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import FormControl from "@material-ui/core/FormControl";
import { deploymentStore } from "@/store";
import workspaceStore from "../../../../../../store/WorkSpace";
import clusterStore from "../../../../../../store/Cluster";
import podStore from "../../../../../../store/Pod";
import CreateTamplateTargetCluster from "./CreateTamplateTargetCluster";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid ${(props) => (props.disabled ? "#d5d5d5" : "black")};
  color: ${(props) => (props.disabled ? "#d5d5d5" : "black")};
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const CreateTamplateStepThree = observer(() => {
  const [open2, setOpen2] = useState(false);
  const [containerIndex, setContainerIndex] = useState(1);

  const {
    targetClusters,
    resetTargetClusters,
    deployment,
    setDeployment,
    setDeploymentPriority,
  } = deploymentStore;

  const { selectClusterInfo } = workspaceStore;

  const { loadCluster, clusterDetail, initClusterDetail } = clusterStore;

  const { podListInclusterAPI, podListIncluster } = podStore;

  const openTargetClusters = (index) => {
    setOpen2(true);
    setContainerIndex(index);
  };

  const loadSourceNode = (targetCluster) => {
    setDeploymentPriority("sourceNode", "");
    loadCluster(targetCluster[0]);
  };

  const showTargetClusters = () => {
    if (targetClusters.length === 0) {
      return "+ Target Clusters";
    }
    if (deployment.priority.name === "GSetClusterPriority") {
      return JSON.stringify(targetClusters[0]);
    }
    return JSON.stringify(targetClusters);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const PriorityComponent = () => {
    const handlePriority = (e) => {
      if (e.target.name === "name") {
        resetTargetClusters();
        if (e.target.value === "GLowLatencyPriority") {
          setDeployment("priority", {
            name: "GLowLatencyPriority",
            mode: "default",
            sourceCluster: "",
            sourceNode: "",
          });
        }
        if (e.target.value === "GMostRequestPriority") {
          setDeployment("priority", {
            name: "GMostRequestPriority",
            mode: "cpu",
          });
        }
        if (e.target.value === "GSelectedClusterPriority") {
          setDeployment("priority", {
            name: e.target.value,
            mode: "default",
            sourceCluster: "",
          });
        }
        if (e.target.value === "GSetClusterPriority") {
          setDeployment("priority", {
            name: e.target.value,
          });
        }
      }

      if (e.target.name === "mode") {
        resetTargetClusters();
        if (deployment.priority.name === "GLowLatencyPriority") {
          if (e.target.value === "default") {
            setDeployment("priority", {
              name: "GLowLatencyPriority",
              mode: "default",
              sourceCluster: "",
              sourceNode: "",
            });
          }
          if (e.target.value === "from_pod") {
            setDeployment("priority", {
              name: "GLowLatencyPriority",
              mode: "from_pod",
              sourceCluster: "",
              podName: "",
            });
          }
        }
        if (deployment.priority.name === "GMostRequestPriority") {
          setDeployment("priority", {
            name: "GMostRequestPriority",
            mode: e.target.value,
          });
        }
        if (deployment.priority.name === "GSelectedClusterPriority") {
          if (e.target.value === "default") {
            setDeployment("priority", {
              name: "GSelectedClusterPriority",
              mode: "default",
              selectCluster: "",
            });
          }
          if (e.target.value === "node") {
            initClusterDetail();
            setDeployment("priority", {
              name: "GSelectedClusterPriority",
              mode: "node",
              sourceCluster: "",
              sourceNode: "",
            });
          }
        }
      }

      if (e.target.name === "sourceCluster") {
        setDeploymentPriority("sourceCluster", e.target.value);
        if (deployment.priority.mode === "default") {
          loadCluster(e.target.value);
          setDeploymentPriority("sourceNode", "");
        }
        if (deployment.priority.mode === "from_pod") {
          podListInclusterAPI(e.target.value, deployment.project);
          setDeploymentPriority("podName", "");
        }
        if (deployment.priority.mode === "node") {
          loadCluster(e.target.value);
          setDeploymentPriority("sourceNode", "");
        }
      }

      if (e.target.name === "sourceNode") {
        setDeploymentPriority("sourceNode", e.target.value);
      }

      if (e.target.name === "podName") {
        setDeploymentPriority("podName", e.target.value);
      }
    };

    const SelectedPriorityComponent = () => {
      switch (deployment.priority.name) {
        case "GLowLatencyPriority":
          return (
            <>
              <tr>
                <th>
                  Priority Mode<span className="requried">*</span>
                </th>
                <td>
                  <FormControl className="form_fullWidth">
                    <select
                      name="mode"
                      value={deployment.priority.mode}
                      onChange={handlePriority}
                    >
                      <option value={"default"}>from node</option>
                      <option value={"from_pod"}>from pod</option>
                    </select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th>
                  Source Clusters & Nodes<span className="requried">*</span>
                </th>
                <td>
                  {deployment.priority.mode === "default" ? (
                    <div>
                      <FormControl style={{ width: "50%" }}>
                        <select
                          name="sourceCluster"
                          value={deployment.priority.sourceCluster}
                          onChange={handlePriority}
                        >
                          <option value={""} selected disabled hidden>
                            Select Source Cluster
                          </option>
                          {selectClusterInfo.map((cluster) => (
                            <option value={cluster.clusterName}>
                              {cluster.clusterName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                        <select
                          name="sourceNode"
                          onChange={handlePriority}
                          value={deployment.priority.sourceNode}
                          disabled={
                            deployment.priority.sourceCluster === "" && true
                          }
                        >
                          <option value={""} selected disabled hidden>
                            Select Source Node
                          </option>
                          {clusterDetail.nodes !== null ? (
                            clusterDetail.nodes.map((node) => (
                              <option value={node.name}>{node.name}</option>
                            ))
                          ) : (
                            <option value={"noData"}>No Data</option>
                          )}
                        </select>
                      </FormControl>
                    </div>
                  ) : (
                    <div>
                      <FormControl style={{ width: "50%" }}>
                        <select
                          name="sourceCluster"
                          value={deployment.priority.sourceCluster}
                          onChange={handlePriority}
                        >
                          <option value={""} selected disabled hidden>
                            Select Cluster
                          </option>
                          {selectClusterInfo.map((cluster) => (
                            <option value={cluster.clusterName}>
                              {cluster.clusterName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                        <select
                          name="podName"
                          onChange={handlePriority}
                          value={deployment.priority.podName}
                          disabled={
                            deployment.priority.sourceCluster === "" && true
                          }
                        >
                          <option value={""} selected disabled hidden>
                            Select Pod
                          </option>
                          {podListIncluster !== null ? (
                            podListIncluster.map((pod) => (
                              <option value={pod.name}>{pod.name}</option>
                            ))
                          ) : (
                            <option value={"noData"}>No Data</option>
                          )}
                        </select>
                      </FormControl>
                    </div>
                  )}
                </td>
              </tr>
            </>
          );
        case "GMostRequestPriority":
          return (
            <tr>
              <th>
                Priority Mode<span className="requried">*</span>
              </th>
              <td>
                <FormControl>
                  <select
                    name="mode"
                    value={deployment.priority.mode}
                    onChange={handlePriority}
                  >
                    <option value={"cpu"}>CPU</option>
                    <option value={"gpu"}>GPU</option>
                    <option value={"memory"}>MEMORY</option>
                  </select>
                </FormControl>
              </td>
            </tr>
          );
        case "GSelectedClusterPriority":
          return (
            <>
              <tr>
                <th>
                  Priority Mode<span className="requried">*</span>
                </th>
                <td>
                  <FormControl className="form_fullWidth">
                    <select
                      name="mode"
                      value={deployment.priority.mode}
                      onChange={handlePriority}
                    >
                      <option value={"default"}>Cluster</option>
                      <option value={"node"}>Node</option>
                    </select>
                  </FormControl>
                </td>
              </tr>
              {deployment.priority.mode === "node" && (
                <>
                  <tr>
                    <th>Target Clusters</th>
                    <td>
                      <Button onClick={() => openTargetClusters(-1)}>
                        {showTargetClusters()}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Source Node<span className="requried">*</span>
                    </th>
                    <td>
                      <div>
                        <FormControl style={{ width: "100%" }}>
                          <select
                            name="sourceNode"
                            onChange={handlePriority}
                            value={deployment.priority.sourceNode}
                          >
                            <option value={""} selected disabled hidden>
                              Select Source Node
                            </option>
                            {clusterDetail.nodes !== null ? (
                              clusterDetail.nodes.map((node) => (
                                <option value={node.name}>{node.name}</option>
                              ))
                            ) : (
                              <option value={"noData"}>No Data</option>
                            )}
                          </select>
                        </FormControl>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </>
          );
        case "GSetClusterPriority":
          return;
        default:
          break;
      }
    };

    return (
      <>
        <tr>
          <th style={{ width: "30%" }}>
            Priority Type <span className="requried">*</span>
          </th>
          <td>
            <FormControl className="form_fullWidth">
              <select name="name" onChange={handlePriority}>
                <option value={"GLowLatencyPriority"}>
                  GLowLatencyPriority
                </option>
                <option value={"GMostRequestPriority"}>
                  GMostRequestPriority
                </option>
                <option value={"GSelectedClusterPriority"}>
                  GSelectedClusterPriority
                </option>
                <option value={"GSetClusterPriority"}>
                  GSetClusterPriority
                </option>
              </select>
            </FormControl>
          </td>
        </tr>
        {SelectedPriorityComponent()}
      </>
    );
  };

  return (
    <>
      <CreateTamplateTargetCluster
        open={open2}
        onClose={() => setOpen2(false)}
        onComplete={loadSourceNode}
      />
      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
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
          {PriorityComponent()}
          {deployment.priority.mode === "node" ? (
            <></>
          ) : (
            <tr>
              <th>Target Clusters</th>
              <td>
                <Button
                  style={{ marginBottom: "2px" }}
                  onClick={() => openTargetClusters(-1)}
                >
                  {showTargetClusters()}
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
});

export default CreateTamplateStepThree;
