import { Search } from "@mui/icons-material";
import {
    Button,
    Paper,
    SelectChangeEvent,
    Stack
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FilterCriteria } from "../../Type/Utils";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import NavigationTable from "../../components/common/Table/NavigationTable";
import TableList from "../../components/common/Table/TableList";
import TableTitle from "../../components/common/Table/TableTitle";
import BreadcrumbsComponent from "../../components/common/Utils";
import { roles } from "../../constant/Utils";
import { breadcrumbAccountItems } from "../../constant/breadcrums";
import { headerAccount } from "../../constant/headerTable";
import { Account } from "../../models/account";
import {
    deleteAccountById,
    fetchAccounts,
} from "../../store/accounts/operation";
import {
    clearValidationErrors,
    setFilterAccount,
} from "../../store/accounts/slice";
import { initializeState } from "../../store/common/pagination";
import { AppDispatch, useSelector } from "../../store/configstore";
import {
    filterClassesByGrade,
    initializeClassState,
} from "../../store/initdata/slice";
import CommonUtil from "../../utils/export";
import EditAccount from "./EditAccount";

const AccountList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const accountList: Account[] = useSelector((state) => state.account.data);
    const currentData: Account[] = useSelector((state) => state.account.currentData);
    const isLoading: boolean = useSelector((state) => state.account.isLoading);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isNew, setIsNewAccount] = useState(false);
    const [filter, setFilter] = useState<FilterCriteria>({
        role: { value: "", strict: true },
        nameTeacher: { value: "", strict: false },
    });

    const handleChangeFilter =
        (property: keyof FilterCriteria) =>
            (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
                if (property === "gradeId") {
                    dispatch(filterClassesByGrade(event.target.value));
                }

                setFilter((prev) => ({
                    ...prev,
                    [property]: {
                        value: event.target.value,
                        strict: prev[property]?.strict ?? true,
                    },
                }));
            };

    const handleFilterData = () => {
        console.log("filter", filter);

        const allValuesEmpty = Object.values(filter).every((filterItem) => {
            return filterItem.value === "";
        });

        if (allValuesEmpty) {
            dispatch(setFilterAccount(AccountList));
            return;
        }

        const filterData: Account[] = CommonUtil.filterData(accountList, filter);
        dispatch(setFilterAccount(filterData));
    };

    const handleClose = () => {
        setDialogOpen(false);
        dispatch(clearValidationErrors());
    };

    const handleSuccessEdit = async (isSuccess: boolean) => {
        if (isSuccess) {
            await dispatch(fetchAccounts());
            dispatch(clearValidationErrors());
            setDialogOpen(false);
            setSelectedAccount(null);
        }
    };

    const addNewAccount = () => {
        setSelectedAccount(null);
        setIsNewAccount(true);
        setDialogOpen(true);
    };

    const onDeleteClick = async (id: number) => {
        await dispatch(deleteAccountById(id));
        await dispatch(fetchAccounts());
    };

    const editAccount = (id: number) => {
        setIsNewAccount(false);
        setDialogOpen(true);
        setSelectedAccount(
            accountList.find((student) => student.id === id) || null
        );
    };

    const handleExport = async () => {
        await CommonUtil.exportToExcel(
            "hoc-sinh-toan-truong",
            "Danh sách học sinh",
            accountList
        );
    };

    const handleReload = async () => {
        dispatch(fetchAccounts());
    };

    useEffect(() => {
        dispatch(initializeClassState());
        dispatch(initializeState());
        dispatch(fetchAccounts());
    }, []);

    return (
        <ContentLayout>
            <BreadcrumbsComponent
                breadcrumbs={breadcrumbAccountItems}
                haveAddButton={true}
                handleAddButton={addNewAccount}
            ></BreadcrumbsComponent>
            <Paper
                sx={{
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                    marginTop: "15px",
                    boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px",
                }}
            >
                <TableTitle
                    title="Danh sách tài khoản"
                    handleExport={handleExport}
                    reload={handleReload}
                />
                <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <SelectDropdown
                            id={"grade"}
                            width={150}
                            label="Phân Quyền"
                            options={roles}
                            value={filter.role.value}
                            onChange={handleChangeFilter("role")}
                        />
                        <CustomInput
                            label={"Giáo viên"}
                            value={filter.nameTeacher.value}
                            onChange={handleChangeFilter("nameTeacher")}
                            placeholder={"Họ và tên"}
                            fullWidth={false}
                        />

                        <Button
                            style={{
                                height: "35px",
                                minWidth: "80px",
                                textTransform: "none",
                            }}
                            size="small"
                            component="label"
                            variant="contained"
                            startIcon={<Search />}
                            onClick={handleFilterData}
                        >
                            Tìm kiếm
                        </Button>
                    </Stack>
                    <NavigationTable count={currentData.length} />
                </Stack>
                <TableList
                    isLoading={isLoading}
                    headers={headerAccount}
                    currentData={currentData}
                    onEditClick={editAccount}
                    onDeleteClick={onDeleteClick}
                ></TableList>
            </Paper>

            <EditAccount
                isNew={isNew}
                isOpen={isDialogOpen}
                selectedAccount={selectedAccount}
                handleClose={handleClose}
                onClickEdit={handleSuccessEdit}
            />
        </ContentLayout>
    );
};

const ContentLayout = styled("div")(() => ({
    padding: "15px 20px 0px 20px",
    overflowY: "auto",
}));

export default AccountList;
