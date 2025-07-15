import React from "react";

const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label p-2 gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input type="checkbox" className="checkbox border-slate-800" />
        </label>
      </div>

      <div className="form-control">
        <label className={`label p-2 gap-2 cursor-pointer`}>
          <span className="label-text">female</span>
          <input type="checkbox" className="checkbox border-slate-800" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
