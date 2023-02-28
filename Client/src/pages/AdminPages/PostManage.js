import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Helmet } from "react-helmet-async";
import { postsState$ } from "../../redux/seclectors/";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
export default function PostManage() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const posts = useSelector(postsState$);
  const data = posts?.map((post) => ({
    key: post._id,
    title: post.title,
    content: post.content,
    author: post.author,
    department: post.department,
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "10%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "30%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",

      render: (_, record) => (
        <Space size="middle">
          <Link>Delete</Link>
        </Space>
      ),
    },
  ];

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        <Table columns={columns} dataSource={data} />
      </Grid>
    </Grid>
  );
}
