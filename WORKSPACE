workspace(name = "humanhybrids")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "build_bazel_rules_nodejs",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.26.0-beta.0/rules_nodejs-0.26.0-beta.0.tar.gz"],
    sha256 = "86ea92217dfd4a84e1e335cc07dfd942b12899796b080492546b947f12c5ab77",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "npm_install")
npm_install(
    name = "npm",
    package_json = "//:package.json",
    package_lock_json = "//:package-lock.json",
)
