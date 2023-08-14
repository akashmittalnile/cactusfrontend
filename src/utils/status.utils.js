import approvedcheck from "../assets/images/admin/approvecheck.svg";
import reject from "../assets/images/admin/reject.svg";
import { Link } from "react-router-dom";



export const userStatus = (Id) => {
    let statusId = parseInt(Id);
    if (statusId === 1) return "Pending";
    else if (statusId === 2) return "Active";
    else if (statusId === 3) return "Inactive";
    else if (statusId === 4) return "Rejected";
}

export const pageStatus = (Id) => {
    let statusId = parseInt(Id);
    if (statusId === 1) return "Active";
    else if (statusId === 2) return "Inactive";
}

export const approvalStatus = (id) => {
    id = parseInt(id);
    if (id === 1) {
        return (
            <>
                <Link className="reject-btn mx-1" href="">Reject</Link>
                <Link className="approve-btn" href="">Approve</Link>
            </>
        )
    } else if (id === 2 || id === 3) {
        return (
            <><img src={approvedcheck} alt="not-found" /> Approved</>
        )
    } else if (id === 4) {
        return (
            <><img src={reject} alt="not-found" /> Rejected</>
        )
    }
};

export const totalPageCalculator = (total, limit) => {
    const pages = [];
    for (let x = 1; x <= Math.ceil(total / limit); x++) {
        pages.push(x);
    }
    return pages;
}