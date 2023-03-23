import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles.js";
import { Modal, Button, Input, Switch, Dropdown } from "antd";
import { Store } from "../../../Store";
import * as actions from "../../../redux/actions";
import { animalList } from "./anonymousAnimal.js";
const { TextArea } = Input;

export default function Subcomment({ subcomment }) {
  const dispatch = useDispatch();
  const { state } = useContext(Store);
  const user = state.userInfo;
  const [SubcmtEdit, setSubcmtEdit] = useState(false);
  const [Subcmtupdate, setSubcmtUpdate] = useState(false);
  const [Subcmtoption, setSubcmtOption] = useState(false);
  const [animal, setAnimal] = useState("");
  const [newSubcmt, setnewSubcmt] = React.useState({});
  // Anonymous Animals
  useEffect(() => {
    setAnimal(getRandomAnimal());
  }, []);
  const getRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animalList.length);
    return animalList[randomIndex];
  };
  const [likeSubcmtActive, setLikeSubcmtActive] = React.useState(false);
  const [dislikeSubcmtActive, setDislikeSubcmtActive] = React.useState(false);
  const onLikeSubcmtClick = React.useCallback(() => {
    if (likeSubcmtActive) {
      setLikeSubcmtActive(false);
      dispatch(
        actions.updateSubcomments.updateSubcommentsRequest({
          ...subcomment,
          likeCount: subcomment.likeCount - 1,
        })
      );
    } else {
      setLikeSubcmtActive(true);
      dispatch(
        actions.updateSubcomments.updateSubcommentsRequest({
          ...subcomment,
          likeCount: subcomment.likeCount + 1,
        })
      );
      if (dislikeSubcmtActive) {
        setDislikeSubcmtActive(false);
        dispatch(
          actions.updateSubcomments.updateSubcommentsRequest({
            ...subcomment,
            likeCount: subcomment.likeCount + 2,
          })
        );
      }
    }
  }, [dispatch, subcomment, likeSubcmtActive, dislikeSubcmtActive]);
  const onDislikeSubcmtClick = React.useCallback(() => {
    if (dislikeSubcmtActive) {
      setDislikeSubcmtActive(false);
      dispatch(
        actions.updateSubcomments.updateSubcommentsRequest({
          ...subcomment,
          likeCount: subcomment.likeCount + 1,
        })
      );
    } else {
      setDislikeSubcmtActive(true);
      dispatch(
        actions.updateSubcomments.updateSubcommentsRequest({
          ...subcomment,
          likeCount: subcomment.likeCount - 1,
        })
      );
      if (likeSubcmtActive) {
        setLikeSubcmtActive(false);
        dispatch(
          actions.updateSubcomments.updateSubcommentsRequest({
            ...subcomment,
            likeCount: subcomment.likeCount - 2,
          })
        );
      }
    }
  }, [dispatch, subcomment, likeSubcmtActive, dislikeSubcmtActive]);
  const classes = useStyles();
  const handleOk = React.useCallback(() => {
    setSubcmtEdit(false);
  }, []);
  const handleoption = React.useCallback(() => {
    setSubcmtOption(false);
  }, []);
  const Subcmtoptionopen = React.useCallback(() => {
    setSubcmtUpdate(true);
  }, []);
  const Subcmtoptionclose = React.useCallback(() => {
    setSubcmtUpdate(false);
  }, []);
  const updateSubcmthandler = React.useCallback(() => {
    dispatch(
      actions.updateSubcomments.updateSubcommentsRequest({
        _id: subcomment._id,
        author: user._id,
        ...newSubcmt,
      })
    );
    handleOk();
    Subcmtoptionclose();
  }, [dispatch, newSubcmt, subcomment, Subcmtoptionclose, handleOk, user]);
  const deletehandler = React.useCallback(() => {
    dispatch(
      actions.deleteSubcomments.deleteSubcommentsRequest(subcomment._id)
    );
  }, [subcomment, dispatch]);
  const itemsforuser = [
    {
      key: "1",
      label: <div onClick={Subcmtoptionopen}>Update</div>,
    },
    {
      key: "2",
      label: <div onClick={deletehandler}>Delete</div>,
    },
  ];
  const itemsforother = [
    {
      key: "1",
      label: <div onClick={Subcmtoptionopen}>Report</div>,
    },
    {
      key: "2",
      label: <div onClick={deletehandler}>Delete</div>,
    },
  ];

  return (
    <>
      <Card className={classes.card} key={subcomment._id}>
        <CardHeader
          avatar={
            subcomment.isAnonymous ? (
              <img src={animal.avatar} alt={`${animal.name} Avatar`} />
            ) : (
              <img
                src={subcomment.author.avatar}
                alt={subcomment.author.fullName}
              />
            )
          }
          title={
            subcomment.isAnonymous
              ? `Anonymous ${animal.name}`
              : subcomment.author.fullName
          }
          subheader={moment(subcomment.createdAt).format("LLL")}
          action={
            <IconButton title="Edit subcomment">
              <Dropdown
                menu={
                  subcomment.author.fullName === user.fullName
                    ? { items: itemsforuser }
                    : { items: itemsforother }
                }
                trigger={["click"]}
              >
                <MoreVertIcon />
              </Dropdown>
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" component="p" color="textSecondary">
            {subcomment.content}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={onLikeSubcmtClick}
            style={{ color: likeSubcmtActive ? "red" : "" }}
          >
            <FavoriteIcon />
            <Typography component="span" color="textSecondary"></Typography>
          </IconButton>
          <IconButton
            onClick={onDislikeSubcmtClick}
            style={{ color: dislikeSubcmtActive ? "blue" : "" }}
          >
            -<FavoriteIcon />
            <Typography component="span" color="textSecondary"></Typography>
          </IconButton>
          {`${subcomment.likeCount} likes`}
        </CardActions>
      </Card>
      <Modal
        open={SubcmtEdit}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
        style={{ width: 350, height: 150 }}
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12}>
            <center>Option</center>
          </Grid>
          <Grid container>
            <Grid item xs={3} lg={3} />
            <Grid item xs={6} lg={6}>
              <Button
                type="primary"
                block
                style={{ marginBottom: "10px" }}
                onClick={Subcmtoptionopen}
              >
                Update
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} lg={3} />
            <Grid item xs={6} lg={6}>
              <Button type="primary" block onClick={deletehandler}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        open={Subcmtoption}
        onOk={handleoption}
        onCancel={handleoption}
        footer={null}
        className="container"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12}>
            <Button type="primary" block>
              Report
            </Button>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        open={Subcmtupdate}
        onOk={Subcmtoptionclose}
        onCancel={Subcmtoptionclose}
        footer={null}
        style={{ width: 350, height: 170 }}
      >
        <Grid item xs={12} lg={12}>
          <center>Update subcomment</center>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextArea
            placeholder="Any comments ?"
            className="idea-create"
            allowClear
            autoSize={{
              minRows: 1,
              maxRows: 2,
            }}
            size="large"
            onChange={(e) =>
              setnewSubcmt({
                content: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid container style={{ marginTop: 15 }}>
          {/* <Grid item xs={3} lg={3} /> */}
          <Grid
            item
            xs={12}
            lg={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Switch
                style={{ width: "200px" }}
                checkedChildren="Anonymous"
                unCheckedChildren={user.fullName}
                onChange={(checked) => setnewSubcmt({ isAnonymous: checked })}
              />
            </div>
            <div>
              <Button
                type="primary"
                block
                style={{ marginBottom: "10px" }}
                onClick={updateSubcmthandler}
              >
                Update
              </Button>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
