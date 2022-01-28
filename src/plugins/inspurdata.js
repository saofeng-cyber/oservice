const USER_INFOR={};
const BASE_URL="/main/govcharts";//应用的基路径
const STANDALONE=false;//是否独立启动
const ERRORSERVICE=true;//是否提示错误
const PERMISSIONSYSTEM_ENABLE= true;//是否走本地token模式。
const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNGI0YjgxZGRjYjNlNGNjYjhkMzZlNWE2ZTZlMjk2OGMiLCJ1c2VybmFtZSI6ImFkbWluIn0.Z8e0eswOXya9xQfuzL3JbUBVgmw3rU_Pf98kMNnz_Wg";
//本地token模式时token值
const PERMISSIONSYSTEM={"CONF_TOKEN": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl9hcHBfaWQiOiIxMjY1NTg5MjY1ODMwNDM2ODY2Iiwic3ViIjoiSW5zcHVyLUF1dGgtTWFuYWdlciIsImF1ZCI6bnVsbCwibG9naW5fdWlkIjoiMTI2NTU4OTI2NzM4MjMyOTM0NiIsIm5iZiI6MTU5MDY1ODQxNCwibG9naW5fYWNjb3VudF9pZCI6IjEyNjU1ODkyNjc0Mjg0NjY2OTAiLCJpc3MiOiJJbnNwdXIiLCJsb2dpbl9sb2dpbm5hbWUiOiJhZG1pbiIsImxvZ2luX2FjY291bnRfbmFtZSI6IueuoeeQhuWRmCIsImV4cCI6MTU5MDc0NDgxNCwianRpIjoiMS4wIiwibG9naW5fdW5hbWUiOiLnrqHnkIblkZgifQ.H2ysfYa4oZaolPlJzKZxVbV5iNlTB07sLqo1dnXKFsZg7UzeUHY7GHx_OPSwCjUuFhPABhkb1qsjvJWNqJgJhA"};
export default {
    USER_INFOR,
    STANDALONE,
    ERRORSERVICE,
    PERMISSIONSYSTEM_ENABLE,
    PERMISSIONSYSTEM,
    BASE_URL,
    token
}
