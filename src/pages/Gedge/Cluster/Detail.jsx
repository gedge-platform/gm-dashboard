import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import { clusterStore } from "@/store";
import styled from "styled-components";
import { dateFormatter, isValidJSON, nullCheck } from "@/utils/common-utils";
import ReactJson from "react-json-view";
import EventAccordion from "@/components/detail/EventAccordion";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  background-color: #2f3855;

  p {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Label = styled.span`
  height: 20px;
  background-color: #20263a;
  vertical-align: middle;
  padding: 0 2px 0 2px;
  line-height: 20px;
  font-weight: 600;
  margin: 6px 6px;

  .key {
    padding: 0 2px;
    background-color: #eff4f9;
    color: #36435c;
    text-align: center;
  }
  .value {
    padding: 0 2px;
    text-align: center;
    color: #eff4f9;
  }
`;

const NoInfo = styled.div`
  padding: 12px 12px;
  background-color: #141a30;
`;

const Detail = observer((props) => {
  const {
    clusterDetail: {
      clusterName,
      clusterEndpoint,
      clusterCreator,
      clusterType,
      created_at,
      events,
      ipAddr,
      nodes,
      resource: {
        cronjob_count,
        deployment_count,
        job_count,
        pod_count,
        // gpu,
        service_count,
        volume_count,
        Statefulset_count,
        daemonset_count,
      },
    },
    dataUsage,
    gpu,
    loadCluster,
  } = clusterStore;
  const nodesChk = nodes === null ? 0 : nodes;

  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const [nodeNum, setNodeNum] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const nodeList = () => {
    return nodes.map((node, idx) => (
      <tr onClick={() => setNodeNum(idx)}>
        <td>{node.name}</td>
        <td>{node.type}</td>
        <td>{node.nodeIP}</td>
        <td>{node.kubeVersion}</td>
        <td>{node.os}</td>
        <td>{dateFormatter(node.created_at)}</td>
      </tr>
    ));
  };

  const labelByNode = () => {
    return Object.entries(nodes[nodeNum].labels).map(([key, value]) => (
      <Label>
        <span className="key">{key}</span>
        <span className="value">{value}</span>
      </Label>
    ));
  };
  const annotationByNode = () => {
    return Object.entries(nodes[nodeNum].annotations).map(([key, value]) => (
      <tr>
        <th style={{ width: "40%" }}>{key}</th>
        <td>
          {isValidJSON(value) ? (
            <ReactJson
              src={JSON.parse(value)}
              theme="summerfruit"
              displayDataTypes={false}
              displayObjectSize={false}
            />
          ) : (
            value
          )}
        </td>
      </tr>
    ));
  };
  const test = (gpu) => {
    return (
      gpu?.nodes
      ? gpu.nodes.map((x) => {
        if(x.type === "master"){
        return(
          <>
            <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody className="tb_data_detail">
              <tr>
                <th>clusterName</th>
                <td>{gpu.clusterName ? gpu.clusterName : "-"}</td>
                <th>node</th>
                <td>{x.name ? x.name : "-"}</td>
              </tr>
              <tr>
                <th>gpu</th>
                <td>{gpu.gpu ? gpu.gpu : "-"}</td>
                <th>container</th>
                <td>{x.containerRuntimeVersion}</td>
              </tr>
            </tbody>
            </table>
            <br/>
          </>
        )}
      }) : null)
  }

  useEffect(() => {
    if (nodesChk.length >= 1) {
      labelByNode();
      annotationByNode();
      loadCluster(clusterName);
    }
  }, [nodeNum]);

  return (
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Resource Status" />
        <CTab label="Node Info" />
        <CTab label="Metadata" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel style={{ overflowY: "scroll" }} value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            {/* <tbody className="tb_data_detail">
              <tr>
                <th>Cluster Name</th>
                <td>{clusterName}</td>
                <th>IP</th>
                <td>{ipAddr}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{clusterType}</td>
                <th>Creator</th>
                <td>{clusterCreator}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{dateFormatter(created_at)}</td>
              </tr>
            </tbody> */}
          </table>
          <br />

          {/* <TableTitle>GPU List</TableTitle> */}
          {console.log(gpu)}
          {console.log(dataUsage)}
          {gpu ? (
            <>
              {test(gpu)}
              {/* <table className="tb_data" style={{ tableLayout: "fixed" }}>
                <tbody className="tb_data_detail">
                  <tr>
                    <th>clusterName</th>
                    <td>{gpu.clusterName ? gpu.clusterName : "-"}</td>
                    <th>created_at</th>
                    <td>{gpu.created_at ? gpu.created_at : "-"}</td>
                  </tr>
                  <tr>
                    <th>gpu</th>
                    <td>{gpu.gpu ? gpu.gpu : "-"}</td>
                    <th>container</th>
                    <td>
                      {gpu?.nodes
                        ? gpu.nodes.map((x) => x.type === "master" ? x.containerRuntimeVersion : "")
                        : "-"}</td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </table> */}
              <TableTitle>Resource Usage</TableTitle>
              <tbody>
                <tr className="tb_workload_detail_th">
                  <td colSpan={4}>
                    {dataUsage ? (
                      <>
                        <table className="tb_data">
                          <tbody>
                            <tr>
                              <th style={{ width: "307px" }}>CPU</th>
                              <td style={{ width: "307px" }}>
                                {dataUsage?.cpuUsage ? dataUsage?.cpuUsage.value : "-"}
                              </td>
                              <th style={{ width: "307px" }}>MEMORY</th>
                              <td style={{ width: "307px" }}>
                                {dataUsage?.memoryUsage
                                  ? dataUsage?.memoryUsage.value
                                  : "-"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <LabelContainer>
                        <p>No Resource Usage Information</p>
                      </LabelContainer>
                    )}
                  </td>
                </tr>
              </tbody>
            </>
          ) : (
            <LabelContainer>
              <p>No GPU Info</p>
            </LabelContainer>
          )}
        </div>
      </CTabPanel>
      <CTabPanel style={{ overflowY: "scroll" }} value={tabvalue} index={1}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody className="tb_data_detail">
              <tr>
                <th>Deployment</th>
                <td>{deployment_count ? deployment_count : "-"}</td>
                <th>Pod</th>
                <td>{pod_count ? pod_count : "-"}</td>
              </tr>
              <tr>
                <th>Service</th>
                <td>{service_count ? service_count : "-"}</td>
                <th>Cronjob</th>
                <td>{cronjob_count ? cronjob_count : "-"}</td>
              </tr>
              <tr>
                <th>StatefulSet</th>
                <td>{Statefulset_count ? Statefulset_count : "-"}</td>
                <th>DaemonSet</th>
                <td>{daemonset_count ? daemonset_count : "-"}</td>
              </tr>
              <tr>
                <th>Job</th>
                <td>{job_count ? job_count : "-"}</td>
                <th>Volume</th>
                <td>{volume_count ? volume_count : "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel style={{ overflowY: "scroll" }} value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>Node List</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>IP</th>
                <th>Kube-Version</th>
                <th>OS</th>
                <th>Created</th>
              </tr>
              {nodesChk.length >= 1 ? (
                nodeList()
              ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel style={{ overflowY: "scroll" }} value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>
            Labels({nodesChk.length >= 1 ? nodes[nodeNum].name : "NotFound"})
          </TableTitle>
          <LabelContainer>
            {nodesChk.length >= 1 ? labelByNode() : <p>No Labels Info</p>}
          </LabelContainer>
          <br />
          <br />
          <TableTitle>
            Annotations(
            {nodesChk.length >= 1 ? nodes[nodeNum].name : "NotFound"})
          </TableTitle>
          {nodesChk.length >= 1 ? (
            <table className="tb_data">
              <tbody>{annotationByNode()}</tbody>
            </table>
          ) : (
            <LabelContainer>
              <p>No Annotations Info</p>
            </LabelContainer>
          )}
        </div>
      </CTabPanel>
      <CTabPanel style={{ overflowY: "scroll" }} value={tabvalue} index={4}>
        <EventAccordion events={events} />
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;
