"use client";
import * as React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/joy";
import { ChevronRightRounded, HomeRounded } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "@mui/joy/Link";
import { useEffect, useState } from "react";

export const BreadCrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [paths, setPaths] = useState<string[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const p = formatUrl(url); // url.slice(0, -1).slice(1);

    // Check if paths is not empty and if the last value is not the same as p
    if (p && (paths.length === 0 || paths[paths.length - 1] !== p)) {
      setPaths([...paths, url]);
      console.log(p);
    }
    // paths.push(url);
  }, [pathname, searchParams]);

  function formatUrl(url: string) {
    // Remove the first and last characters
    const trimmedUrl = url.slice(1, -1);

    // Replace "/" with a space
    const replacedUrl = trimmedUrl.replace("/", ", ");

    // Capitalize the first letter of the first word
    const formattedUrl =
      replacedUrl.charAt(0).toUpperCase() + replacedUrl.slice(1);

    return formattedUrl;
  }
  function shrinkPath(index: number): void {
    const ps = [...paths];
    ps.splice(index); // This will remove all elements after the specified index
    console.log(ps, index + 1);
    setPaths(ps); // Assuming setPaths is a function that updates the state of paths
  }

  return (
    <Breadcrumbs
      size="md"
      aria-label="breadcrumbs"
      separator={<ChevronRightRounded fontSize="small" />}
      sx={{ pl: 0 }}
    >
      <Link color="neutral" href="/" aria-label="Home">
        <HomeRounded />
      </Link>
      {paths.map((path, index) => (
        <Box key={index}>
          {index === paths.length - 1 ? (
            <Typography color="primary" fontWeight={500} fontSize={12}>
              {formatUrl(path)}
            </Typography>
          ) : (
            <Link
              underline="none"
              component="button"
              onClick={() => {
                shrinkPath(index);
                push(path);
              }}
            >
              {formatUrl(path)}
            </Link>
          )}
        </Box>
      ))}
    </Breadcrumbs>
  );
};
