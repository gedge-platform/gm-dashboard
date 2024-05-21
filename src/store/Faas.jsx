import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FAAS_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

class FaasStatus {
  envList = [];
  envDetail = {};
  functionsList = [];
  packageList = [];
  triggerList = [];

  totalElements = 0;
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;

  envName = "";
  setEnvName = (value) => {
    runInAction(() => {
      this.envName = value;
    });
  };

  envImage = "";
  setEnvImage = (value) => {
    runInAction(() => {
      this.envImage = value;
    });
  };

  poolSize = "";
  setPoolSize = (value) => {
    runInAction(() => {
      this.poolSize = value;
    });
  };

  envNameList = "";
  setEnvNameList = (value) => {
    runInAction(() => {
      this.envNameList = value;
    });
  };

  functionName = "";
  setFunctionName = (value) => {
    runInAction(() => {
      this.functionName = value;
    });
  };

  functionFileContent = "";
  setFunctionFileContent = (value) => {
    runInAction(() => {
      this.funcionFileContent = value;
    });
  };

  triggerHttpInputs = {
    trig_name: "",
    trig_type: "",
    url: "",
    method: "",
    function: "",
  };

  triggerKatkaQueue = {
    trig_name: "",
    trig_type: "",
    function: "",
    mqtype: "",
    mqtkind: "",
    topic: "",
    resptopic: "",
    errortopic: "",
    maxretries: 0,
    metadata: [],
    cooldownperiod: 0,
    pollinginterval: 0,
    secret: "",
  };

  packageSource = {
    pack_name: "",
    env_name: "",
    sourcearchive: "",
    build: "",
  };

  packageDeploy = {
    pack_name: "",
    env_name: "",
    deployarchive: "",
  };

  packageCode = {
    pack_name: "",
    env_name: "",
    code: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
      this.currentPage = 1;
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.paginationList();
      }
    });
  };

  paginationList = () => {
    runInAction(() => {
      if (this.envList !== null) {
        this.viewList = this.envList.slice(
          (this.currentPage - 1) * 20,
          this.currentPage * 20
        );
      }
    });
  };

  resetPackageSource = () => {
    runInAction(() => {
      this.packageSource = {
        pack_name: "",
        env_name: "",
        sourcearchive: "",
        build: "",
      };
    });
  };

  resetPackageDeploy = () => {
    runInAction(() => {
      this.packageDeploy = {
        pack_name: "",
        env_name: "",
        deployarchive: "",
      };
    });
  };

  resetPackageCode = () => {
    runInAction(() => {
      this.packageCode = {
        pack_name: "",
        env_name: "",
        code: "",
      };
    });
  };

  setTriggerHttpInputs = (e) => {
    runInAction(() => {
      this.triggerHttpInputs = e;
    });
  };

  resetTriggerHttpInputs = () => {
    runInAction(() => {
      this.triggerHttpInputs = {
        trig_name: "",
        trig_type: "",
        url: "",
        method: "",
        function: "",
      };
    });
  };

  setTriggerKatkaQueue = (e) => {
    runInAction(() => {
      this.triggerKatkaQueue = e;
    });
  };

  resetTriggerKatkaQueue = () => {
    runInAction(() => {
      this.triggerKatkaQueue = {
        trig_name: "",
        trig_type: "",
        function: "",
        mqtype: "",
        mqtkind: "",
        topic: "",
        resptopic: "",
        errortopic: "",
        maxretries: 0,
        metadata: [],
        cooldownperiod: 0,
        pollinginterval: 0,
        secret: "",
      };
    });
  };

  setPackageSource = (e) => {
    runInAction(() => {
      this.packageSource = e;
    });
  };

  setPackageDeploy = (e) => {
    runInAction(() => {
      this.packageDeploy = e;
    });
  };

  setPackageCode = (e) => {
    runInAction(() => {
      this.packageCode = e;
    });
  };

  loadEnvListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/environments`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.envList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.envList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.envList = [];
        this.paginationList();
      });
  };

  PostEnvAPI = async (envName, envImage, callback) => {
    const body = {
      env_name: envName,
      image: envImage,
    };
    await axios.post(`${FAAS_URL}/environments`, body).then((res) => {
      if (res.status === 201) {
        swalError("생성되었습니다");
        this.loadEnvListAPI();
      } else {
        swalError("생성 실패", callback);
      }
    });
  };

  DeleteEnvAPI = async (envName, callback) => {
    await axios.delete(`${FAAS_URL}/environments/${envName}`).then((res) => {
      if (res.status === 200) {
        swalError("삭제되었습니다");
      } else {
        swalError("삭제 실패", callback);
      }
    });
  };

  loadEnvDetailAPI = async (envName) => {
    await axios
      .get(`${FAAS_URL}/environments/${envName}`)
      .then((res) => {
        console.log(res);
        runInAction(() => {
          if (res.data !== null) {
            this.envDetail = res.data;
          } else {
            this.envDetail = {};
          }
        });
      })
      .catch((error) => {
        this.envList = {};
      });
  };

  putEnvAPI = async (envName) => {
    const body = {
      poolsize: this.poolSize,
    };
    await axios.put(`${FAAS_URL}/environments/${envName}`, body).then((res) => {
      swalError("수정되었습니다");
      this.loadEnvListAPI();
    });
  };

  loadFuncionsListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/functions`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.functionsList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.functionsList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.functionsList = [];
        this.paginationList();
      });
  };

  PostFuncionsAPI = async (callback) => {
    const body = {
      func_name: this.functionName,
      env_name: this.envNameList,
      func_content: JSON.stringify(this.functionFileContent),
    };
    await axios
      .post(`${FAAS_URL}/functions`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          swalError("생성되었습니다");
          this.loadFuncionsListAPI();
        } else {
          swalError("생성 실패", callback);
        }
      });
  };

  DeleteFuncionsAPI = async (envName, callback) => {
    await axios.delete(`${FAAS_URL}/functions/${envName}`).then((res) => {
      if (res.status === 200) {
        swalError("삭제되었습니다");
      } else {
        swalError("Environment  삭제 실패", callback);
      }
    });
  };

  loadPackageListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/packages`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.packageList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.packageList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.packageList = [];
        this.paginationList();
      });
  };

  postPackageFileApi = async (data, callback) => {
    for (let value of data.values()) {
    }
    const body = {
      ...data,
    };
    await axios
      .post(`${FAAS_URL}/packages/upload`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        runInAction(() => {
          if (res.data.length === 0) {
            swalError("파일이 업로드 실패", callback);
            return false;
          } else {
            swalError("파일이 업로드 되었습니다", callback);
            return true;
          }
        });
      });
  };

  createPackage = async (data) => {
    const body = JSON.stringify(data);
    try {
      const response = await axios.post(`${FAAS_URL}/packages`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        swalError("생성되었습니다.");
      }
    } catch (error) {
      swalError(error.response.data);
    }
  };

  deletePackageAPI = async (envName, callback) => {
    await axios.delete(`${FAAS_URL}/packages/${envName}`).then((res) => {
      if (res.status === 200) {
        swalError("삭제되었습니다");
      } else {
        swalError("삭제 실패", callback);
      }
    });
  };

  loadTriggerListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/triggers`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.triggerList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.packageList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.triggerList = [];
        this.paginationList();
      });
  };

  createTrigger = async (data) => {
    const body = { ...data };
    console.log("body ???? ", body);
    try {
      const response = await axios.post(`${FAAS_URL}/triggers`, body);
      console.log("res ??? ", response);
      if (response.status === 201) {
        swalError("생성되었습니다");
      }
    } catch (error) {
      swalError(error.response.data);
    }
  };

  deleteTriggerAPI = async (trigName, callback) => {
    await axios.delete(`${FAAS_URL}/triggers/${trigName}`).then((res) => {
      if (res.status === 200) {
        swalError("삭제되었습니다");
        this.loadTriggerListAPI();
      } else {
        swalError("삭제 실패", callback);
      }
    });
  };
}

const FaasStore = new FaasStatus();
export default FaasStore;
