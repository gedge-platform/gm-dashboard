import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import ClusterOverview from "./TabList/ClusterOverviewTab";
import PsysicalResource from "./TabList/PhysicalResourceTab";

const Monitoring = () => {
    const currentPageTitle = Title.Monitoring;

    const [tabvalue, setTabvalue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    return (
        <Layout currentPageTitle={currentPageTitle}>
            <CTabs type="tab1" value={tabvalue} onChange={handleTabChange}>
                <CTab label="Cluster Overview" />
                <CTab label="Physical Resource" />
                <CTab label="API Server" />
                <CTab label="Scheduler" />
                <CTab label="Application Resource" />
            </CTabs>
            <div className="tabPanelContainer">
                <CTabPanel value={tabvalue} index={0}>
                    <ClusterOverview />
                </CTabPanel>
                <CTabPanel value={tabvalue} index={1}>
                    <PsysicalResource />
                </CTabPanel>
            </div>
        </Layout>
    );
};

export default Monitoring;
