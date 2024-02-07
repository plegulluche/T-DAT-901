import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function Table(props) {
  return <table {...props} className={twMerge("w-full", props.className)} />;
}

export function Thead(props) {
  return (
    <thead
      {...props}
      className={twMerge("text-sm text-basic-200 text-left", props.className)}
    />
  );
}

export function Tbody(props) {
  return <tbody {...props} className={twMerge("", props.className)} />;
}

export function Tr(props) {
  return (
    <tr
      {...props}
      className={twMerge("border-t border-[#F4F4F4] p-3", props.className)}
    />
  );
}

export function Th(props) {
  return (
    <th
      {...props}
      className={twMerge(
        "p-3 font-normal text-xs border-r border-[#F4F4F4]",
        props.className
      )}
    />
  );
}

export function Td(props) {
  return (
    <td
      {...props}
      className={twMerge("p-4 border-r border-[#F4F4F4]", props.className)}
    />
  );
}

export function TdLink(props) {
  return (
    <td className={twMerge("p-0", props.className)}>
      <Link
        to={props.to}
        className="w-full h-full block p-4 border-r border-[#F4F4F4]"
      >
        {props.children}
      </Link>
    </td>
  );
}
