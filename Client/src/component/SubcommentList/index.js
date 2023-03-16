import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Subcomment from "./Subcomment";
import { Link } from "react-router-dom";
import { Input, Button, Typography, Switch } from "antd";
import { Store } from "../../Store";
import { subcommentsLoading$, subcommentsState$ } from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";



const { TextArea } = Input;
const { Text } = Typography;
export default function SubcommentList({ comment }) {
  const dispatch = useDispatch();
  const subcomments = useSelector(subcommentsState$);
  const sortedcomments =subcomments?.filter((subcomment)=>subcomment?.commentID?._id===comment._id)
  const isLoading = useSelector(subcommentsLoading$);
  const [reply, setreply] = useState(false)
  const [viewsubcomment, setviewsubcomment] = useState(false)
  const { state } = useContext(Store);

  React.useEffect(() => {
    dispatch(actions.getSubcomments.getSubcommentsRequest());
  }, [dispatch]);
  const user = state.userInfo;
  const [subcomment, setsubcomment] = React.useState({
    author: "",
    content: "",
    isAnonymous: false,
    postID: comment.postID._id,
    commentID: comment._id,
  });

  const subcommenthandler = React.useCallback(() => {
    dispatch(actions.createSubcomments.createSubcommentsRequest(subcomment));
    setreply(false);
  }, [subcomment, dispatch]);
  const replyhandle = React.useCallback(() => {
    reply?setreply(false):setreply(true);
  }, [reply])
  const viewreply = React.useCallback(() => {
   viewsubcomment?setviewsubcomment(false):setviewsubcomment(true);
  }, [viewsubcomment])
  return (
    <>
      <Grid container spacing={1}  >
        <Grid item xs={4} sm={4} ><Button
          type="primary"
          block
          onClick={replyhandle}
        >
          Reply
        </Button>
        </Grid>
        <Grid item xs={8} sm={8} >
          <Button
            type="link"
            block
            onClick={viewreply}
          >Show {sortedcomments.length} replies
          </Button>
        </Grid>
      </Grid>
      {reply &&
        <Grid container spacing={1} alignItems="stretch" style={{ marginTop: 10 }}>
          <Grid container>
            <Grid item xs={2} sm={2} />
            <Grid
              item
              xs={8}
              sm={8}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Link to="/profile">
                  <img alt={user?.fullName} src={user?.avatar} />
                </Link>
                {user.fullName}
              </div>
              <div>
                <Text type="secondary" style={{ marginLeft: "-10%" }}>
                  {sortedcomments.length} reply
                </Text>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} sm={2} />
            <Grid item xs={8} sm={8}>
              <TextArea
                placeholder="Any comments?"
                className="idea-create"
                allowClear
                autoSize={{
                  minRows: 3,
                  maxRows: 4,
                }}
                size="large"
                onChange={(e) =>
                  setsubcomment({
                    ...subcomment,
                    content: e.target.value,
                    author: user._id,
                  })
                }
                required
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} sm={2} />
            <Grid
              item
              xs={8}
              sm={8}
              style={{ display: "flex", justifyContent: "space-between  " }}
            >
              <div>
                <Switch
                  style={{ width: "200px", top: "20px" }}
                  checkedChildren="Anonymous"
                  unCheckedChildren={user.fullName}
                  onChange={(checked) =>
                    setsubcomment({
                      ...subcomment,
                      isAnonymous: checked,
                    })
                  }
                />
              </div>
              <div>
                <Button
                  type="primary"
                  style={{ marginTop: 15 }}
                  block
                  onClick={subcommenthandler}
                >
                  Post
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      }
        {viewsubcomment &&subcomments.length > 0 && (
          <Grid style={{ marginTop: "100px" }} item xs={12} sm={12}>
            {isLoading ? (
              <LoadingBox />
            ) : (
              sortedcomments?.map((subcomment) => (
                <Subcomment key={subcomment._id} subcomment={subcomment} />
              ))
            )}
          </Grid>
        )}</>

  );
}
